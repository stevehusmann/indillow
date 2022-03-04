import axios from "axios";
import { FETCH_JOBS, SET_SEARCH_TERMS } from './types';
const ROOT_URL = "http://localhost:8000";

export const fetchJobs = (query, location, radius, pageLink) => dispatch => {
  axios.get(`${ROOT_URL}/jobs?q=${query}&l=${location}&radius=${radius}&pageLink=${pageLink}`)
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

