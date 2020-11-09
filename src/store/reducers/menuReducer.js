const initState = {
    error: null,
    pending: false,
    menus: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOAD_MENU_PENDING':
            console.error('loading menus')
            return {
                ...state,
                pending: true
            }
        case 'LOAD_MENU_SUCCESS':
            return {
                ...state,
                error: null,
                pending: false,
                menus: action.menus
            }
        case 'LOAD_DAY_MENU':
            return {
                ...state,
                error: null,
                pending: false,
                menus: action.menus
            }
        case 'LOAD_MENU_ERROR':
            return {
                ...state,
                error: action.err,
                pending: false
            }
        default:
            return state
    }
}

export default authReducer

