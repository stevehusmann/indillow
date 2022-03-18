import axios from "axios";
import { FETCH_JOBS, SET_CURRENT_JOB_KEYS, SET_SEARCH_TERMS, SET_CURRENT_POPUP } from './types';
const ROOT_URL = "http://localhost:8000";

export const fetchJobs = (pageLink, abortController) => dispatch => {

  const scrapePage = (urlToScrape, jobKeys) => {
    axios.post(`${ROOT_URL}/jobs`, {URL: urlToScrape, jobKeys: jobKeys}, {signal: abortController.signal})
    .then(function (response) {
      dispatch({type: FETCH_JOBS, payload: response.data.jobsArray});
      if (response.data.nextURL) {
        scrapePage(response.data.nextURL, response.data.jobKeys);
      } else {
        console.log('Scraping complete.');
        dispatch(setCurrentJobKeys(jobKeys));
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  const jobKeys = [];
  scrapePage(pageLink, jobKeys);
};

export const setSearchTerms = (query, location) => dispatch => {
  dispatch({type: SET_SEARCH_TERMS, payload: {query: query, location: location}});
};

export const setCurrentJobKeys = (currentJobKeys) => dispatch => {
  dispatch({type: SET_CURRENT_JOB_KEYS, payload: currentJobKeys});
};

export const setCurrentPopup = (jobIndex) => dispatch => {
  dispatch ({type: SET_CURRENT_POPUP, payload: jobIndex});
}