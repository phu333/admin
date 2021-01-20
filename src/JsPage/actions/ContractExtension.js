export const contractExtensionInformation = () => {
    return {
      type: 'LIST_contractExtension',
    }
  }
  export const createcontractExtension = (contractExtension) => {
    
    return {
      type: 'CREATE_contractExtension',
      contractExtension
    }
  }
  export const updatecontractExtension = (contractExtension) => {
    return {
      type: 'UPDATE_contractExtension',
      contractExtension
    }
  }
  export const deactivecontractExtension = (contractExtensionID) => {
    return {
      type: 'DEACTIVE_contractExtension',
      contractExtensionID
    }
  }