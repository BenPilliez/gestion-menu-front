export const updateTitle = (title) => {
    return (dispatch, getState) => {
        dispatch({type: "UPDATE_JUMBO_TITLE", title})
    }
}

export const showAvatar = (showAvatar) => {
    return (dispatch, getState) => {
        dispatch({type: "SHOWAVATAR_JUMBO", showAvatar})
    }
}

export const defaultJumbro = () => {
    return (dispatch) => {
        dispatch({type:"DEFAULT_JUMBO"})
    }
}
