import React from "react"
import MobileNavigation from "../mobile/mobileNavigation"
import {useMediaQuery} from "@material-ui/core"
import AppBarNav from "../AppBar/appBarNav";


const NavBar = (props) => {
    const matches = useMediaQuery(theme => theme.breakpoints.down('sm') || theme.breakpoints.down('xs'));

    return (
        matches === true ? (<MobileNavigation />) : (<AppBarNav />)
    )
}


export default NavBar
