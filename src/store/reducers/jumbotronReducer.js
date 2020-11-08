const initState = {
    title: "Bon qu'est ce qu'on mange ce soir ?",
    showAvatar: false
}

const jumbotronReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_JUMBO_TITLE':
            console.log('UPDATE')
            return {
                ...state,
                title: action.title
            }
        case 'SHOWAVATAR_JUMBO':
            return {
                ...state,
                showAvatar: action.showAvatar
            }
        case 'DEFAULT_JUMBO':
            return {
                title: "Bon qu'est ce qu'on mange ce soir ?",
                showAvatar: false
            }
        default:
            return state
    }
}

export default jumbotronReducer

