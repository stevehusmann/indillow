/* eslint-disable import/no-anonymous-default-export */
import { FETCH_JOBS, SET_SEARCH_TERMS } from '../actions/types';

const DEFAULT_STATE = []

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_JOBS: 
      return state.concat(action.payload)

    case SET_SEARCH_TERMS:
      return DEFAULT_STATE;
    
    default:
      return state;
    }
}