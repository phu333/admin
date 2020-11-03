var initialState = [];
const myUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_user':
            return state;
        case 'CREATE_user':
            state.push(action.user)
            
            return [...state];
        case 'UPDATE_user':
            state.push(action.user)
            return [...state];
        case 'DEACTIVE_user':
            state.push(action.userID)
            return [...state];
        default:
            return state;
    }
}
export default myUserReducer;