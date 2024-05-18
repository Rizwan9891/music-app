import handleFiles from './fileReducer'
import AuthReducer from './authReducer';
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
    handleFiles,AuthReducer
})
export default rootReducer;