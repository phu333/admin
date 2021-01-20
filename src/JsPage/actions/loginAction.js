export const loginInformation = () => {
  return {
    type: 'LIST_login',
  }
}
export const addLogin = (login) => {
  return {
    type: 'ADD_login',
    login,
    
  }
}
export const logout = () => {
  return {
    type: 'LOGOUT',
    
  }
}