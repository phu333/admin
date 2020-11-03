import { combineReducers } from 'redux'
import myLoginReducer from './logins'
import myCompanyReducer from './companys'
import myUserReducer from './users'
const myReducers  = combineReducers({
    myLoginReducer,
    myCompanyReducer,
    myUserReducer
    
});
export default myReducers;