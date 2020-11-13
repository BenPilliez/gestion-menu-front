export const passwordUpdate = (form,id) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/user/password/${id}`, data:form, method:'PUT'})
            .then((res) => {
                dispatch({type:'PASSWORD_UPDATE_SUCCESS'})
                toast.success('Ton mot de passe a été mis à jour')
            }).catch(error => {
                dispatch({type: 'PASSWORD_UPDATE_ERROR', error: error.response.data})
        })
    }
}

export const clearState = () => {
    return (dispatch) => {
        dispatch({type: "RESET_STATE"})
    }
}

export const avatarUpdate = () => {

}
