import { SET_CURRENT_POPUP } from "../actions/types";

const DEFAULT_STATE = '';

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case SET_CURRENT_POPUP: 
      return action.payload;
  
    default:
      return state;
    }
}