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
export const deleteMenu = (id) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({
            url: `${process.env.REACT_APP_BASE_URL}/propositions/${id}`,
            method: 'DELETE'
        })
            .then((res) => {
                dispatch({type: 'DELETE_MENU'})
                toast.success('Le menu a bien été supprimé')
            }).catch(err => {
            toast.error('Il y a eu un problème pendant la suppression')
        })
    }
}

export const updateDataLoading = (value) => {
    return (dispatch) => {
        dispatch({type: 'UPDATE_DATA_LOADING', value})
    }
}
export const editMenu = (id,form) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({
            url: `${process.env.REACT_APP_BASE_URL}/propositions/${id}`,
            data:form,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'PUT'
        })
            .then((res) => {
                dispatch({type: 'EDIT_MENU', propositions: res.data})
                toast.success('Le menu a bien été modifié')
            }).catch(err => {
            toast.error('Il y a eu un problème pendant la copie')
        })
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
