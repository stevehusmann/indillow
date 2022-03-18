import { combineReducers } from 'redux';
import JobsReducer from './reducer-jobs';
import SearchTermsReducer from './reducer-search-terms';
import CurrentJobKeysReducer from './reducer-current-job-keys';
import CurrentPopupReducer from './reducer-current-popup';

const rootReducer = combineReducers({
  jobs: JobsReducer,
  searchTerms: SearchTermsReducer,
  currentJobKeys: CurrentJobKeysReducer,
  currentPopup: CurrentPopupReducer
})

export default rootReducer;