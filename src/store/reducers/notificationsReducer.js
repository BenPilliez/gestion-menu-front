const initState = {
    notifications: [],
    dataLoading: true
}

const notificationsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'NOTIFICATIONS_LOADING':
            return {
                ...state,
                dataLoading: true,
            }
        case 'NOTIFICATIONS':
            console.log('GET NOTIFICATIONS')
            state.notifications = action.notifications
            return {
                ...state,
                notifications: action.notifications,
                dataLoading: false
            }
        case 'DELETE_NOTIFICATION':
            console.log("DELETE NOTIFICATION")
            const newNotifications = state.notifications.filter((item) => {
                return item.propositionsId !== action.propId
            })
            return  {
                ...state,
                notifications: newNotifications,
                dataLoading: false
            }
        default:
            return state
    }
}

export default notificationsReducer

