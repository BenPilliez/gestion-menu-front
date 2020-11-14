import {setAuthorization} from "../../config/axiosConfig";

export const signIn = (credentials) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({url: process.env.REACT_APP_BASE_URL + '/auth/signin', data: credentials, method: 'POST'})
            .then((res) => {
                setAuthorization(axiosInstance, res.data.token)
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

export const updateAuthUserInfo = (info) => {
    return (dispatch) => {
        console.log("update user info")
        dispatch({type: 'UPDATE_USER_INFO', user: info})
    }
}

export const loadPropUser = (page) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/auth/account`})
            .then((res) => {
                dispatch({type: 'USER_PROPOSITIONS', userPropositions: res.data, page: page})
            }).catch(err => {
            console.log(err);
            toast.error('Oops on a eu un problème en chargeant la liste')
        })
    }
}

export const signOut = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch({type: "SIGNOUT_SUCCESS"})
    }
}
