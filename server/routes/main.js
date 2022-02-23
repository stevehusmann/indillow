const router = require("express").Router();
const axios = require('axios');
const puppeteer = require('puppeteer');

// const URL = 'https://www.indeed.com/jobs?q=cook&l=Round%20Rock,%20TX&radius=0&start=0';

router.get("/jobs", async (req, res, next) => {
  const query = req.query.q || ' ';
  const location = req.query.l || ' ';
  const radius = req.query.radius || 0;
  // const query = 'Cook';
  // const location = 'Round Rock';
  // const radius = 0;
  let URL = `http://www.indeed.com/jobs?q=${query}&l=${location}&radius=${radius}`;
  const jobsArray = [];
  let pageCount = 1;

  while (URL) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
  
    const resultsArray = await page.evaluate(() => {
      return window.mosaic.providerData["mosaic-provider-jobcards"].metaData.mosaicProviderJobCardsModel.results;
    })
    
    resultsArray.map(job => {
      if(job.loceTagValueList) {
        let address = '';
        let neighborhood = '';
        if(job.loceTagValueList.length == 1) {
          address = `${job.loceTagValueList[0].slice(54,-2)}, ${job.jobLocationCity}, ${job.jobLocationState} ${job.jobLocationPostal}`;
          neighborhood = null;
        } else if (job.loceTagValueList.length == 2) {
          address = `${job.loceTagValueList[1].slice(54,-2)}, ${job.jobLocationCity}, ${job.jobLocationState} ${job.jobLocationPostal}`;
          neighborhood = job.loceTagValueList[0].slice(59,-2);
        }

        jobsArray.push({
          key: job.jobkey,
          jobTitle: job.title,
          company: job.company,
          link: 'https://indeed.com' + job.link,
          urgentlyHiring: job.urgentlyHiring,
          salary: job.salarySnippet.text,
          address: address,
          neighborhood: neighborhood
        })
        
      }
    })

    const newURL = await page.evaluate(() => {
      return document.querySelector('a[aria-label="Next"]')?.getAttribute('href');
    });
    
    if (newURL) {
      URL = 'https://www.indeed.com' + newURL;
    } else {
      URL = null;
    }
console.log(URL);
pageCount++;
  }

  res.send(jobsArray);

})

module.exports = router;

