const initState = {
    propositions: null,
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOAD_DAY_MENU':
            console.log('load menu details')
            return {
                ...state,
                propositions: action.propositions
            }
        case 'CREATE_MENU':
            return state
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

