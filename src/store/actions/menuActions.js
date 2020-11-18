export const dataLoading = () => {
    return (dispatch) => {
        dispatch({type: "DATA_LOADING"})
    }
}

export const getMenusDays = (day, weekNumber) => {
    return (dispatch, getState, {axiosInstance, toast, indexDb}) => {
        dispatch(dataLoading())
        let menus = JSON.parse(localStorage.getItem(`${day}-${weekNumber}`));
        if (menus) {
            dispatch({type: 'GET_FROM_LOCALSTORAGE', day: day, weekNumber: weekNumber})
        } else {
            axiosInstance({
                url: `${process.env.REACT_APP_BASE_URL}/propositions/${day}?week=${weekNumber}`,
                method: 'GET'
            })
                .then((res) => {
                    dispatch({
                        type: "LOAD_FROM_REQUEST",
                        propositions: res.data.rows,
                        day: day,
                        weekNumber: weekNumber,
                        store: indexDb
                    })
                })
                .catch((error) => {
                    console.log(error.response)
                    console.log(error)
                    toast.error(error.response.data.error)
                })
        }

    }
}

export const addMenu = (form, day, weekNumber) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        dispatch({type: 'IS_CREATED_OR_EDIT'})
        dispatch(dataLoading())
        axiosInstance({
            url: `${process.env.REACT_APP_BASE_URL}/propositions/`,
            data: form,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                dispatch(addToStorage(res.data, res.data.day, res.data.week))
                toast.success('Ta proposition a bien été ajouté')
            })
            .catch((error) => {
                console.log(error)
                console.log(error.response)
                dispatch({type: 'ERROR_CREATE_MENU'})
                let err = error.response ? error.response.data : 'Oops on a eu un problème'
                toast.error(err)
            })
    }
}

export const addToStorage = (data, day, weekNumber) => {
    return (dispatch) => {
        dispatch({type: "ADD_TO_STORAGE", data, day, weekNumber})
    }
}

export const deleteItemFromStorage = (day,week, item) => {
    return (dispatch) => {
        dispatch({type: "DELETE_ITEM_FROM_STORAGE", day,week ,item})
    }
}

export const editMenu = (id, form) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        dispatch({type: 'IS_CREATED_OR_EDIT'})
        axiosInstance({
            url: `${process.env.REACT_APP_BASE_URL}/propositions/${id}`,
            data: form,
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
        dispatch({type: 'IS_CREATED_OR_EDIT'})
        axiosInstance({
            url: `${process.env.REACT_APP_BASE_URL}/propositions/${id}`,
            method: 'DELETE'
        }).then((res) => {
            dispatch({type:"DELETE_ITEM_FROM_STORAGE", day:res.data.day, weekNumber: res.data.week, item: res.data.id})
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
        dispatch(dataLoading())
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

