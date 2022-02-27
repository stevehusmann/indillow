import axios from "axios";
import { FETCH_JOBS } from './types';
const ROOT_URL = "http://localhost:8000";

export const fetchJobs = (query, location, radius) => dispatch => {
  axios.get(`${ROOT_URL}/jobs?q=${query}&l=${location}&radius=${radius}`
  ).then(function (response) {
    dispatch({type: FETCH_JOBS, payload: response.data});
  })
  .catch(function (error) {
    console.log(error);
  })
}