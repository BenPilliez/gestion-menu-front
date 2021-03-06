
export const dataLoading = () => {
    return (dispatch) => {
        dispatch({type: "NOTIFICATIONS_LOADING"})
    }
}

export const notifications = () => {
    return (dispatch, getState, {axiosInstance}) => {
        axiosInstance({url: process.env.REACT_APP_BASE_URL + '/notifications/', method: 'GET'})
            .then((res) => {
                dispatch({type: 'NOTIFICATIONS', notifications: res.data})
            }).catch(err => {
           console.error(err)
        })
    }
}
export const deleteNotifications = (propId) => {
    return (dispatch, getState, {axiosInstance}) => {
        dispatch(dataLoading())
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/notifications/${propId}`, method: 'DELETE'})
            .then((res) => {
                dispatch({type:"DELETE_NOTIFICATION", id:propId})
            }).catch(err => {
            console.error(err)
        })
    }
}

