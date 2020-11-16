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
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
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

export const copyMenu = (id, week, day) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({
            url: `${process.env.REACT_APP_BASE_URL}/propositions/copy/${id}`,
            data: {week: week, day: day},
            method: 'POST'
        })
            .then((res) => {
                dispatch({type: 'CREATE_MENU', propositions: res.data})
                toast.success('Le menu a bien été copié')
            }).catch(err => {
            toast.error('Il y a eu un problème pendant la copie')
        })
    }
}

export const clearState = () => {
    return (dispatch) => {
        dispatch({type: "CLEAR_STATE"})
    }
}
