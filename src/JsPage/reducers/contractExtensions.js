var initialState = [];
const myContractExtensionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_contractExtension':
            return state;
        case 'CREATE_contractExtension':
            state.push(action.contractExtension)
            
            return [...state];
        case 'UPDATE_contractExtension':
            state.push(action.contractExtension)
            return [...state];
        case 'DEACTIVE_contractExtension':
            state.push(action.contractExtensionID)
            return [...state];
        default:
            return state;
    }
}
export default myContractExtensionReducer;