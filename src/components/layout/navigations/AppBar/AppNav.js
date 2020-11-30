import React from "react"
import MobileNavigation from "../mobile/mobileNavigation"
import {useMediaQuery} from "@material-ui/core"
import DesktopNav from "../desktop/desktopNav";
import {connect} from "react-redux";
import {signOut} from "../../../../store/actions/authActions";
import {deleteNotifications, notifications} from "../../../../store/actions/notificationActions";



const AppNav = (props) => {

    React.useEffect(() => {
        if(props.dataLoading) {
            props.getNotifications()
        }
    })

    const matches = useMediaQuery(theme => theme.breakpoints.down('sm') || theme.breakpoints.down('xs'), {noSsr: true})

    return (
        matches === true ? (<MobileNavigation  deleteNotification={props.deleteNotification} notifications={props.notifications} />) : (<DesktopNav deleteNotification={props.deleteNotification} notifications={props.notifications}  />)
    )
}

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications.notifications,
        dataLoading: state.notifications.dataLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        getNotifications: () => dispatch(notifications()),
        deleteNotification: (propId) => dispatch(deleteNotifications(propId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNav)
