// import axios from 'axios';
import { data } from "./data";

export const getWagesFromJobListings = async () => {
  try {
    // const response = await axios.get(URL, options);
    const response = data;
    return response;
  } catch (error) {
    console.log(error);
  }
}