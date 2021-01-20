import axios from 'axios'
import { message } from 'antd'
var initialState = [];
const myEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_employee':
            return state;
        case 'CREATE_employee':

            console.log(action.employeeList)
            state = initialState
            state = action.employeeList
            console.log(state)


            return [...state];
        case 'UPDATE_employee':
            console.log(action.employee.id)

            var New = state.filter(employee => employee.id !== action.employee.id)
            console.log(New)
            state = New
            state.push(action.employee)
            return [...state];
        case 'DEACTIVE_employee':
            state.filter(employee => employee.id !== action.employee.id)
            return [...state];
        default:
            return state;
    }
}
export default myEmployeeReducer;