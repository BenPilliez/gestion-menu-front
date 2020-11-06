const initState = {
    authError: null,
    user: JSON.parse(localStorage.getItem('user')) || null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.error('login error')
            return {
                ...state,
                authError: action.err
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null,
                user: action.user
            }
        default:
            return state
    }
}

export default authReducer

