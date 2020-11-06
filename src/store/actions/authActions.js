import {setAuthorization} from "../../config/axiosConfig";

export const signIn = (credentials) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({url: process.env.REACT_APP_BASE_URL + '/auth/signin', data: credentials, method: 'POST'})
            .then((res) => {
                setAuthorization(res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                localStorage.setItem('token', res.data.token)
                toast.success('Tu es bien connecté')
                dispatch({type: 'LOGIN_SUCCESS', user: res.data.user})
            }).catch(err => {
            toast.error(err.response.data.error)
            dispatch({type: 'LOGIN_ERROR', err: err.response.data.error})
        })
    }
}
