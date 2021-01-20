var initialState = [];
const myContractTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_contractType':
            return state;
        case 'CREATE_contractType':
            console.log(action.contractTypeList)
            state = initialState
            state = action.contractTypeList
            console.log(state)

            return [...state];
        case 'UPDATE_contractType':
            state.push(action.contractType)
            return [...state];
        case 'DEACTIVE_contractType':
            state.push(action.contractTypeID)
            return [...state];
        default:
            return state;
    }
}
export default myContractTypeReducer;