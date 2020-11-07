import React from "react"
import {connect} from "react-redux"
import {Drawer, Button} from "@material-ui/core"
import {Menu} from "@material-ui/icons"
import SideBarLinks from "./sideBarLinks";
import {isMobile} from "react-device-detect"


const NavBar = (props) => {

    const [state, setState] = React.useState({
        sideBarState: false,
        position: isMobile ? 'bottom' : 'right'
    })

    const toggleDrawer = () => {
        setState({
            ...state,
            sideBarState: !state.sideBarState
        })
    }
    const {user} = props

    return (
        <div>
            <Button onClick={toggleDrawer} color={"primary"} variant={"container"} startIcon={<Menu/>}>Menu</Button>
            <Drawer role="presentation"
                    anchor={state.position}
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                    open={state.sideBarState}
                    onClose={toggleDrawer}>
                <SideBarLinks anchor={state.position} user={user}/>
            </Drawer>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(NavBar)
