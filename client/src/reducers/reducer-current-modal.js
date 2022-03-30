import { SET_CURRENT_MODAL } from "../actions/types";

const DEFAULT_STATE = '';

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case SET_CURRENT_MODAL: 
      return action.payload;
  
    default:
      return state;
    }
}