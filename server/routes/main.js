require('dotenv').config();
const router = require("express").Router();
const puppeteer = require('puppeteer');
const {Client} = require("@googlemaps/google-maps-services-js");

// const URL = 'https://www.indeed.com/jobs?q=cook&l=Round%20Rock,%20TX&radius=0&start=0';

router.get("/jobs", async (req, res, next) => {
  const query = req.query.q || ' ';
  const location = req.query.l || ' ';
  const radius = req.query.radius || 0;
  // const query = 'cook';
  // const location = 'Round%20Rock';
  // const radius = 0;

  let URL = `http://www.indeed.com/jobs?q=${query}&l=${location}&radius=${radius}`;
  const jobsArray = [];
  let pageCount = 1;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  while (URL && pageCount < 2) {
    await page.goto(URL);
  
    const resultsArray = await page.evaluate(() => {
      return window.mosaic.providerData["mosaic-provider-jobcards"].metaData.mosaicProviderJobCardsModel.results;
    })
    
    resultsArray.map(async (job) => {
      if(job.loceTagValueList) {
        let address = '';
        let neighborhood = '';
        if(job.loceTagValueList.length == 1 && job.company) {
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
          neighborhood: neighborhood,
          jobTypes: job.jobTypes
        })
      }
    });

    const addLocationData = await Promise.all(jobsArray.map(async (job) => {
      const args = {
        params: {
          key: process.env.GOOGLE_MAPS_API_KEY,
          address: job.address,
        }
      };
      const client = new Client();
      const geocode = await client.geocode(args).then(gcResponse => {
        return gcResponse.data.results[0];
      });
      job.location = geocode.geometry.location;
      job.placeId = geocode.place_id;
    }))

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
await browser.close();
res.send(jobsArray);
});

module.exports = router;

