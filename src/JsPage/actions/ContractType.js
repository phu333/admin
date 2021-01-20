export const contractTypeInformation = () => {
    return {
      type: 'LIST_contractType',
    }
  }
  export const createContractType = (contractTypeList) => {
    
    return {
      type: 'CREATE_contractType',
      contractTypeList
    }
  }
  export const updateContractType = (contractType) => {
    return {
      type: 'UPDATE_contractType',
      contractType
    }
  }
  export const deactiveContractType = (contractTypeID) => {
    return {
      type: 'DEACTIVE_contractType',
      contractTypeID
    }
  }