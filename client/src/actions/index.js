import axios from "axios";
import { FETCH_JOBS, SET_SEARCH_TERMS } from './types';
const ROOT_URL = "http://localhost:8000";

export const fetchJobs = (pageLink) => dispatch => {
  
  const urlToScrape = pageLink;
  console.log('about to scrape ' + urlToScrape);

  const fetchJobsBody = {URL: urlToScrape}

  axios.post(`${ROOT_URL}/jobs`, fetchJobsBody)
  .then(function (response) {
    console.log(response.data);
    dispatch({type: FETCH_JOBS, payload: response.data});
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const setSearchTerms = (query, location) => dispatch => {
  dispatch({type: SET_SEARCH_TERMS, payload: {query: query, location: location}});
};

