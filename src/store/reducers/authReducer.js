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
        case 'UPDATE_USER_INFO':
           localStorage.setItem('user', JSON.stringify(action.user))
            return {
                ...state,
                user: JSON.parse(localStorage.getItem('user'))

            }
        case 'SIGNOUT_SUCCESS':
            console.log("SIGN OUT")
            return {
                user: null,
                authError: null
            }
        default:
            return state

    }
}

export default authReducer

