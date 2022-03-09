require('dotenv').config();
const router = require("express").Router();
const puppeteer = require('puppeteer');
const {Client} = require("@googlemaps/google-maps-services-js");

router.post("/jobs", async (req, res, next) => {
  const URL = req.body.URL;
  const jobKeys = req.body.jobKeys;
  const jobsArray = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  const resultsArray = await page.evaluate(() => {
    try {
      return window.mosaic.providerData["mosaic-provider-jobcards"].metaData.mosaicProviderJobCardsModel.results;
    } catch (error) {
      console.log('Puppeteer JobCard Error: ' + error);
    }
  })
  // add data from initial JS object
  resultsArray.map(async (job) => {
    if(!jobKeys.includes(job.jobkey)){
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
          jobTypes: job.jobTypes,
          logo: job.companyBrandingAttributes ? job.companyBrandingAttributes.logoUrl : null,
        });
      }
      
      
      jobKeys.push(job.jobkey);
    }
  });

  // add GeoLocation Data
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

  console.log("Successfully scraped: " + URL);

  const nextURL = await page.evaluate(() => {
    try {
      const isNextButton = document.querySelector('a[aria-label="Next"]');
      if(isNextButton) {
        const href = document.querySelector('a[aria-label="Next"]').getAttribute('href');
        const pp = document.querySelector('a[aria-label="Next"]').getAttribute('data-pp');
        return 'http://indeed.com' + href + '&pp=' + pp;
      } else {
        return null;
      }    
    } catch (error) {
      console.log('Puppeteer Next Button Error: ' + error);
    }
    
  });

  res.send({
    jobsArray: jobsArray,
    nextURL: nextURL,
    jobKeys: jobKeys
  });

  await browser.close();
});

module.exports = router;