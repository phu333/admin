export const signatureInformation = () => {
  return {
    type: 'LIST_signature',
  }
}
export const createSignature = (signatureList) => {
  
  return {
    type: 'CREATE_signature',
    signatureList
  }
}
export const updateSignature = (signature) => {
  return {
    type: 'UPDATE_signature',
    signature
  }
}
export const deactiveSignature = (signatureID) => {
  return {
    type: 'DEACTIVE_signature',
    signatureID
  }
}