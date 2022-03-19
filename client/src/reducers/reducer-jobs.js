/* eslint-disable import/no-anonymous-default-export */
import { FETCH_JOBS, SET_SEARCH_TERMS } from '../actions/types';

const DEFAULT_STATE = {
  byKey: [],
  byPlaceId: {}
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_JOBS: {
      
      const currentState = Object.assign({}, state);
      console.log(currentState);
      action.payload.map( job => {
        if (currentState.byPlaceId[job.placeId]) {
          currentState.byPlaceId[job.placeId][currentState.byPlaceId[job.placeId].length] = job;
          currentState.byKey.push(job);
        } else {
          currentState.byPlaceId[job.placeId] = [job];
          currentState.byKey.push(job);
        }
        return null;
      })
    
      return {...state, 
        currentState
      }

  }
  
    case SET_SEARCH_TERMS:
      return {...state, 
        byKey: [],
        byPlaceId: {}      
      }
    
    default:
      return state;
    }
}