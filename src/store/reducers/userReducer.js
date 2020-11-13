const initState = {
    isLoading: false,
    error: null,
    passwordUpdate: false,
    avatarUpdate: true
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
        case 'AVATAR_UPDATE_SUCCESS':
            return{
                ...state,
                error: null,
                isLoading: null,
                avatarUpdate: true
            }
        case 'AVATAR_UPDATE_ERROR':
            return{
                ...state,
                error: action.error
            }
        case 'RESET_STATE':
            return {
                ...state,
                passwordUpdate: false,
                isLoading: false,
                avatarUpdate: false,
                error: null
            }

        default:
            return state

    }
}

export default userReducer

