export const employeeInformation = () => {
  return {
    type: 'LIST_employee',
  }
}
export const createEmployee = (employeeList) => {
  
  return {
    type: 'CREATE_employee',
    employeeList
  }
}
export const updateEmployee = (employee) => {
  return {
    type: 'UPDATE_employee',
    employee
  }
}
export const deactiveEmployee = (employeeID) => {
  return {
    type: 'DEACTIVE_employee',
    employeeID
  }
}