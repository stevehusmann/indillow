const router = require("express").Router();
const cheerio = require('cheerio');
const axios = require('axios');

// const URL = 'https://www.indeed.com/jobs?q=cook&l=Round%20Rock,%20TX&radius=0&start=0';

async function fetchHTML(url) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}

router.get("/jobs", async (req, res, next) => {
  // const query = req.query.q || ' ';
  // const location = req.query.l || ' ';
  // const radius = req.query.radius || 0;
  const query = 'Cook';
  const location = 'Round%20Rock,%20TX';
  const radius = 0;
  const start = 0;

  let URL = `https://www.indeed.com/jobs?q=${query}&l=${location}&radius=${radius}&start=${start}`;

  const jobLinkArray = [];
  
  //fetch jobLinkArray
  while (URL) {
    const $ = await fetchHTML(URL);
    const jobCards = $("#mosaic-provider-jobcards .tapItem");
    for (let i=0; i < jobCards.length; i++) {
      const newJobLink = `https://www.indeed.com/viewjob?jk=${$(jobCards[i]).attr('data-jk')}`;
      if(!jobLinkArray.includes(newJobLink)) {
        jobLinkArray.push(newJobLink);
      }
    }

    if($('a[aria-label="Next"]')[0]) {
      const nextURL = $('a[aria-label="Next"]')[0].attribs.href;
      console.log(nextURL);
      URL = `https://www.indeed.com${nextURL}`;
    } else {
      URL = null;
    }
  }

res.send(jobLinkArray);

//   const jobDataArray = [];

//   const asyncRes = await Promise.all(jobLinkArray.map(async (jobLink) => {
//     const $ = await fetchHTML(jobLink);
//     const job = {
//       company :$('.icl-u-lg-mr--sm').text(),
//       address : $('.jobsearch-jobLocationHeader-location').text()
//     };
//     jobDataArray.push(job);
//   }))

  
// console.log(jobDataArray);

})

module.exports = router;

