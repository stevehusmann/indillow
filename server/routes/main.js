const router = require("express").Router();
const cheerio = require('cheerio');
const axios = require('axios');
const { CrawlingAPI } = require('proxycrawl');

// const URL = 'https://www.indeed.com/jobs?q=cook&l=Round%20Rock,%20TX&radius=0&start=0';

const api = new CrawlingAPI({ token: 'PPsoms0m0GIoTgN7qhaxRw' });

async function fetchHTML(url) {
  const { body } = await api.get(url);
  return cheerio.load(body);
}

router.get("/jobs", async (req, res, next) => {
  // const query = req.query.q || ' ';
  // const location = req.query.l || ' ';
  // const radius = req.query.radius || 0;
  const query = 'Cook';
  const location = 'Atlanta';
  const radius = 0;
  const start = 0;

  let URL = `http://www.indeed.com/jobs?q=${query}&l=${location}&radius=${radius}&start=${start}`;

  const jobLinkArray = [];
  let pageCount = 1;

  //fetch jobLinkArray
  while (URL && pageCount < 4) {
    const $ = await fetchHTML(URL);
    res.send($.html())
    const jobCards = $("#mosaic-provider-jobcards .tapItem");
    for (let i=0; i < jobCards.length; i++) {
      const newJobLink = `http://www.indeed.com${jobCards[i].attribs.href}`;
        jobLinkArray.push(newJobLink);
    }

    if($('a[aria-label="Next"]')[0]) {
      const nextURL = $('a[aria-label="Next"]')[0].attribs.href;
      console.log(nextURL);
      URL = `http://www.indeed.com${nextURL}`;
    } else {
      URL = null;
    }
    pageCount++;
  }

  const jobDataArray = [];

  const asyncRes = await Promise.all(jobLinkArray.map(async (jobLink) => {
    
    const requestsPerSecond = 20;
    let currentIndex = 0;
    setInterval(async () => {
      for (let i = 0; i < requestsPerSecond; i++) {
        const $ = await fetchHTML(jobLink);
        const job = {
          company : $('.icl-u-lg-mr--sm.icl-u-xs-mr--xs').text(),
          address : $('.jobsearch-jobLocationHeader-location').text(),
          jobLink : jobLink
        };
        if (job.address) {
          jobDataArray.push(job);
        }
        currentIndex++;
      }
    }, 1000);
    
  }))

  
res.send(jobDataArray);

})

module.exports = router;

