export const contractInformation = () => {
  return {
    type: 'LIST_contract',
  }
}
export const createContract = (contractList) => {
  
  return {
    type: 'CREATE_contract',
    contractList
  }
}
export const updateContract = (contract) => {
  return {
    type: 'UPDATE_contract',
    contract
  }
}
export const deactiveContract = (contractID) => {
  return {
    type: 'DEACTIVE_contract',
    contractID
  }
}