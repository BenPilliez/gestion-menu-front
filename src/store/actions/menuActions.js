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
