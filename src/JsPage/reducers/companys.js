var initialState = [];
const myCompanyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_company':
            return state;
        case 'CREATE_company':
            state.push(action.company)
            
            return [...state];
        case 'UPDATE_company':
            state.push(action.company)
            return [...state];
        case 'DEACTIVE_company':
            state.push(action.companyID)
            return [...state];
        default:
            return state;
    }
}
export default myCompanyReducer;