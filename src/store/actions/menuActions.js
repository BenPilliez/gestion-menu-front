
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
