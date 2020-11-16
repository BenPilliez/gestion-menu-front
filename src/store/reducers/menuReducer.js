const initState = {
    propositions: null,
    userPropositions: null,
    totalItems: null,
    totalPages: null,
    isDataLoading: false,
    isCreatedDeleteOrEdit: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOAD_DAY_MENU':
            console.log('load menu details')
            return {
                ...state,
                propositions: action.propositions
            }
        case 'SENDING_REQUEST': {
            return {
                ...state,
                isCreatedDeleteOrEdit: false
            }
        }
        case 'CREATE_MENU':
            return {
                ...state,
                isCreatedDeleteOrEdit: true
            }
        case 'USER_PROPOSITIONS':
            return {
                ...state,
                isDataLoading: true,
                userPropositions: action.userPropositions.items,
                totalItems: action.userPropositions.totalItems,
                totalPages: action.userPropositions.totalPages
            }
        case 'UPDATE_DATA_LOADING':
            return {
                ...state,
                isDataLoading: action.value
            }
        case 'DELETE_MENU':
            return {
                ...state,
                isDataLoading: false,
                isCreatedDeleteOrEdit: true
            }
        case 'EDIT_MENU':
            return {
                ...state,
                isCreatedDeleteOrEdit: true,
                isDataLoading: false,
            }
        case 'CLEAR_STATE': {
            return {
                ...state,
                propositions: null
            }
        }
        default:
            return state
    }
}

export default authReducer

