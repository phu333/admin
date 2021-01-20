var initialState = [];
const myLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_login':
      return state;
    case 'ADD_login':
      state.pop()
      state.push(action.login)
      localStorage.setItem("loginInfo",JSON.stringify(action.login) )
      console.log(action.login)
      return [...state];
    case 'LOGOUT':
      localStorage.removeItem("loginInfo")
      state.pop()
      
      return [];
    default:
      return state;
  }
}
export default myLoginReducer;