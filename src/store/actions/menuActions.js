export const getMenusDays = (day, weekNumber) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/propositions/${day}?week=${weekNumber}`, method: 'GET'})
            .then((res) => {
                dispatch({type: "LOAD_DAY_MENU", propositions: res.data.rows})
            })
            .catch((error) => {
                console.log(error.response)
                toast.error(error.response.data.error)
            })
    }
}

export const addMenu = (form) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({
            url: `${process.env.REACT_APP_BASE_URL}/propositions/`,
            data: form,
            method: 'POST',
            headers:{
                'Content-Type': 'multipart/form-data'
            }})
            .then((res) => {
                dispatch({type: "CREATE_MENU", propositions: res.data})
                toast.success('Ta proposition a bien été ajouté')
            })
            .catch((error) => {
                console.log(error.response)
                toast.error(error.response.data.error)
            })
    }
}

export const clearState = () => {
    return (dispatch) => {
        dispatch({type: "CLEAR_STATE"})
    }
}
