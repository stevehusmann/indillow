import { SET_PROGRESS, SET_SEARCH_TERMS } from "../actions/types";

const DEFAULT_STATE = 0;

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case SET_SEARCH_TERMS: 
      return 0;
    
    case SET_PROGRESS: 
      if (action.payload === 100){
        return action.payload;
      } else if (state + action.payload < 100) {
        return state + action.payload;
      }
      else {
        return state;
      }
      
    default:
      return state;
    }
}