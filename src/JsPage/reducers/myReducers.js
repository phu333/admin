import { combineReducers } from 'redux'
import myLoginReducer from './logins'
import myCustomerReducer from'./customers'

import myEmployeeReducer from './employees'
const myReducers  = combineReducers({
    myLoginReducer,
    myCustomerReducer,
    
    myEmployeeReducer,
});
export default myReducers;