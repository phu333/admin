export const companyInformation = () => {
    return {
      type: 'LIST_company',
    }
  }
  export const createCompany = (company) => {
    
    return {
      type: 'CREATE_company',
      company
    }
  }
  export const updateCompany = (company) => {
    return {
      type: 'UPDATE_company',
      company
    }
  }
  export const deactiveCompany = (companyID) => {
    return {
      type: 'DEACTIVE_company',
      companyID
    }
  }