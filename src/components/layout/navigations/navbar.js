import React from "react"
import {connect} from "react-redux"
import {Button, Drawer, Grid} from "@material-ui/core"
import {Menu} from "@material-ui/icons"
import SideBarLinks from "./sideBarLinks";
import {isMobile} from "react-device-detect"
import {makeStyles} from "@material-ui/core/styles";
import {signOut} from "../../../store/actions/authActions";
import {SpeedDial} from "@material-ui/lab";


const useStyles = makeStyles((theme) => ({
    buttonNav: {
        padding: theme.spacing(3)
    }
}))

const NavBar = (props) => {

    const [state, setState] = React.useState({
        sideBarState: false,
        position: isMobile ? 'bottom' : 'right'
    })

    const classes = useStyles()

    const toggleDrawer = () => {
        setState({
            ...state,
            sideBarState: !state.sideBarState
        })
    }
    const {user, signOut} = props

    return (
        <div>
            <Grid container direction={"row"} justify={"flex-end"}>
                <Grid item className={classes.buttonNav}>
                    <Button onClick={toggleDrawer} variant={"contained"} color={"primary"}
                            startIcon={<Menu/>}>Menu</Button>
                </Grid>
            </Grid>
            <Drawer role="presentation"
                    anchor={state.position}
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                    open={state.sideBarState}
                    onClose={toggleDrawer}>
                <SideBarLinks anchor={state.position} user={user} signOut={signOut}/>
            </Drawer>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
