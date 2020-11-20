import React from "react"
import MobileNavigation from "../mobile/mobileNavigation"
import {useMediaQuery} from "@material-ui/core"
import DesktopNav from "../desktop/desktopNav";


const AppNav = (props) => {
    const matches = useMediaQuery(theme => theme.breakpoints.down('sm') || theme.breakpoints.down('xs'));

    return (
        matches === true ? (<MobileNavigation />) : (<DesktopNav />)
    )
}


export default AppNav
