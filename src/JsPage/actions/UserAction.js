export const userInformation = () => {
  return {
    type: 'LIST_user',
  }
}
export const createUser = (user) => {
  
  return {
    type: 'CREATE_user',
    user
  }
}
export const updateUser = (user) => {
  return {
    type: 'UPDATE_user',
    user
  }
}
export const deactiveUser = (userID) => {
  return {
    type: 'DEACTIVE_user',
    userID
  }
}