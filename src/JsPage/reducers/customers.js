import axios from 'axios'
import {message} from'antd'
var initialState = [];

const myCustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_customer':
            return state;
        case 'CREATE_customer':
            console.log(action.customerList)
            state = initialState
            state = action.customerList
                console.log(state)
            
            
            return [...state];
        case 'UPDATE_customer':
            state.push(action.customer)
            return [...state];
        case 'DEACTIVE_customer':
            state.push(action.customerID)
            return [...state];
        default:
            return state;
    }
}
export default myCustomerReducer;