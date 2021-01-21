export const customerInformation = () => {
    return {
      type: 'LIST_customer',
    }
  }
  export const createCustomer = (customerList) => {
    
    return {
      type: 'CREATE_customer',
      customerList
    }
  }
  export const updateCustomer = (customer) => {
    return {
      type: 'UPDATE_customer',
      customer
    }
  }
  export const deactiveCustomer = (customerID) => {
    return {
      type: 'DEACTIVE_customer',
      customerID
    }
  }