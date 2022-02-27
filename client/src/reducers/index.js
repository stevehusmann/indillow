import { combineReducers } from 'redux';
import JobsReducer from './reducer-jobs';

const rootReducer = combineReducers({
  jobs: JobsReducer,
})

export default rootReducer;