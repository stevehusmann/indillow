/* eslint-disable import/no-anonymous-default-export */

import { SET_SEARCH_TERMS } from '../actions/types';

const DEFAULT_STATE = {
  query: '',
  location: ''
};

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case SET_SEARCH_TERMS: 
      return action.payload;
  
    default:
      return state;
    }
}