/* eslint-disable import/no-anonymous-default-export */
import { FETCH_JOBS } from '../actions/types';

const DEFAULT_STATE = {};

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_JOBS: 
      return action.payload;
  
    default:
      return state;
    }
}