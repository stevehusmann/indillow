import { combineReducers } from 'redux';
import JobsReducer from './reducer-jobs';
import SearchTermsReducer from './reducer-search-terms';
import CurrentJobKeysReducer from './reducer-current-job-keys';

const rootReducer = combineReducers({
  jobs: JobsReducer,
  searchTerms: SearchTermsReducer,
  currentJobKeys: CurrentJobKeysReducer,
})

export default rootReducer;