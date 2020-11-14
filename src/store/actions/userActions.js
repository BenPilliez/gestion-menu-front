import {updateAuthUserInfo} from "./authActions";

export const clearState = () => {
    return (dispatch) => {
        dispatch({type: "RESET_STATE"})
    }
}

export const passwordUpdate = (form,id) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/user/password/${id}`, data:form, method:'PUT'})
            .then((res) => {
                console.log('PASSWORD')
                dispatch({type:'PASSWORD_UPDATE_SUCCESS'})
                toast.success('Ton mot de passe a été mis à jour')
            }).catch(error => {
                dispatch({type: 'PASSWORD_UPDATE_ERROR', error: error.response.data})
        })
    }
}

export const avatarUpdate = (form,id) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/user/avatar/${id}`,
            data:form, method:'PUT',
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log('AVATAR')
                dispatch({type:'AVATAR_UPDATE_SUCCESS'})
                dispatch(updateAuthUserInfo(res.data))
                toast.success('Ton avatar a été mis à jour')
            }).catch(error => {
            dispatch({type: 'AVATAR_UPDATE_ERROR', error: error.response.data})
            toast.error(error.response.data)
        })
    }
}
