import { combineReducers } from 'redux'
import myLoginReducer from './logins'
import myContractReducer from'./contracts'
import myContractExtensionReducer from './contractExtensions'
import myCustomerReducer from'./customers'
import myContractTypeReducer from './contractTypes'

import myEmployeeReducer from './employees'
const myReducers  = combineReducers({
    myLoginReducer,
    myContractReducer,
    myContractExtensionReducer,
    myCustomerReducer,
    myContractTypeReducer,
    
    myEmployeeReducer,
});
export default myReducers;