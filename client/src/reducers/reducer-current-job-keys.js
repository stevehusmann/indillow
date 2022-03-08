/* eslint-disable import/no-anonymous-default-export */

import { SET_CURRENT_JOB_KEYS, SET_SEARCH_TERMS } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case SET_CURRENT_JOB_KEYS: 
      return action.payload;
    case SET_SEARCH_TERMS:
      return [];
    default:
      return state;
    }
}