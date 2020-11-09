export const getMenusLoading = () => {
    return {
        type: "LOAD_MENU_PENDING"
    }
}

export const getMenus = (weekNumber) => {
    return (dispatch, getState, {axiosInstance}) => {
        dispatch({type: "LOAD_MENU_PENDING"})
        axiosInstance({url: process.env.REACT_APP_BASE_URL + '/propositions', data: weekNumber, method: 'GET'})
            .then((res) => {
                dispatch({type: 'LOAD_MENU_SUCCESS', menus: res.data})
            }).catch(err => {
            dispatch({type: 'LOAD_MENU_ERROR', err: err.response.data.error})
        })
    }
}

export const getMenusDays = (day, weekNumber) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        dispatch({type: "LOAD_MENU_PENDING"})
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/propositions/${day}?week=${weekNumber}`, method: 'GET'})
            .then((res) => {
                dispatch({type: "LOAD_DAY_MENU", menus: res.data})
            })
            .catch((error) => {
                console.log(error.response)
                toast.warn(error.response.data.error)
            })
    }
}
