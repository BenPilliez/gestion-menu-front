const initState = {
    isLoading: false,
    error: null,
    passwordUpdate: false
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_PASSWORD_REQUEST':
            return {
                ...state,
                isLoading: true,
                passwordUpdate: false,
                error: null
            }
        case 'PASSWORD_UPDATE_ERROR':
            console.error('user error')
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case 'PASSWORD_UPDATE_SUCCESS':
            return {
                ...state,
                passwordUpdate: true,
                isLoading: false,
                error: null
            }
        case 'RESET_STATE':
            return {
                ...state,
                passwordUpdate: false,
                isLoading: false,
                error: null
            }

        default:
            return state

    }
}

export default userReducer

