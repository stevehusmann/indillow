require('dotenv').config();
const router = require("express").Router();
const puppeteer = require('puppeteer');
const {Client} = require("@googlemaps/google-maps-services-js");

router.get("/jobs", async (req, res, next) => {
  const query = req.query.q || ' ';
  const location = req.query.l || ' ';
  const radius = req.query.radius || 0;
  const pageLink = req.query.pageLink;
  let URL = null;
  const jobsArray = [];
  
  if (pageLink) {
    URL = pageLink;
  } else {
    URL = `http://www.indeed.com/jobs?q=${query}&l=${location}&radius=${radius}`;
  }
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  const resultsArray = await page.evaluate(() => {
    return window.mosaic.providerData["mosaic-provider-jobcards"].metaData.mosaicProviderJobCardsModel.results;
  })

  // add data from initial JS object
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
      });
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

  res.send(jobsArray);

  await browser.close();
});

// get the links for remaining pages to be scraped
router.get("/pages", async (req, res, next) => {  
  const query = req.query.q || ' ';
  const location = req.query.l || ' ';
  const radius = req.query.radius || 0;
  let URL = `http://www.indeed.com/jobs?q=${query}&l=${location}&radius=${radius}`;
  
  const linkArray = [];
  const browser = await puppeteer.launch();

  while (URL) {
    console.log('checking ' + URL + ' for NEXT button.');
    const page = await browser.newPage();
    await page.goto(URL);
    URL = await page.evaluate(() => {
      const href = document.querySelector('a[aria-label="Next"]')?.getAttribute('href');
      const pp = document.querySelector('a[aria-label="Next"]')?.getAttribute('data-pp');
      if (href && pp) {
        return 'http://indeed.com' + href + '&pp=' + pp;
      } else {
        return null;
      }
    });
    if (URL) {
      linkArray.push(URL);
    }
  }
  res.send(linkArray);
  await browser.close();

  });

  



module.exports = router;