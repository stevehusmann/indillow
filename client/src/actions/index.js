import axios from "axios";
import { FETCH_JOBS, SET_CURRENT_JOB_KEYS, SET_SEARCH_TERMS, SET_CURRENT_POPUP, SET_PROGRESS, SET_CURRENT_MODAL } from './types';
const ROOT_URL = process.env.REACT_APP_API_HOST;

export const fetchJobs = (pageLink, abortController) => dispatch => {

  const scrapePage = (urlToScrape, jobKeys) => {
    let scrapingStart= false;
    //CHANGE FOR DEPLOYMENT
    axios.post(`${ROOT_URL}/jobs`, {URL: urlToScrape, jobKeys: jobKeys}, {signal: abortController.signal})
    .then(function (response) {
      dispatch({type: SET_PROGRESS, payload: 10});
      dispatch({type: FETCH_JOBS, payload: response.data.jobsArray});
      scrapingStart= true;
      if (response.data.nextURL) {
        scrapePage(response.data.nextURL, response.data.jobKeys);
      } else if (!response.data.nextURL && scrapingStart) {
        console.log('scraping complete');
        dispatch(setCurrentJobKeys(jobKeys));
        dispatch({type: SET_PROGRESS, payload: 100});
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  const jobKeys = [];
  scrapePage(pageLink, jobKeys);
};

export const setProgress =(increment) => dispatch => {
  dispatch({type: SET_PROGRESS, payload: {increment}});
};

export const setSearchTerms = (query, location) => dispatch => {
  dispatch({type: SET_SEARCH_TERMS, payload: {query: query, location: location}});
};

export const setCurrentJobKeys = (currentJobKeys) => dispatch => {
  dispatch({type: SET_CURRENT_JOB_KEYS, payload: currentJobKeys});
};

export const setCurrentPopup = (placeId) => dispatch => {
  dispatch ({type: SET_CURRENT_POPUP, payload: placeId});
}

export const setCurrentModal = (jobKey) => dispatch => {
  dispatch({type: SET_CURRENT_MODAL, payload: jobKey})
}