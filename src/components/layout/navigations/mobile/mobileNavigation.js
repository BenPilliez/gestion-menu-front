import React from "react"
import {BottomNavigation, BottomNavigationAction, Tabs, Tab, AppBar} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {Link as RouterLink} from "react-router-dom";
import {AccountBox, AccountCircle, AddCircleOutline, ExitToApp, Home, Notifications} from "@material-ui/icons";
import {signOut} from "../../../../store/actions/authActions";
import {connect} from "react-redux"

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        width: "100%",
        bottom: 0,
        backgroundColor: theme.palette.primary.main,
    },
}))

const styles = makeStyles((theme) => ({
    root: {
        color: "white",
        "&$selected": {
            color: "#303030"
        },
    },
    selected: {}
}))


const MobileNavigation = (props) => {

    const classes = useStyles()
    const classAction = styles()
    const [value, setValue] = React.useState('home');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AppBar position="bottom" className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab component={RouterLink} classes={classAction} value={"home"}  to="/" icon={<Home/>}/>
                <Tab component={RouterLink} classes={classAction}  value={"create"}  to="/create/propositions" icon={<AddCircleOutline/>}/>
                <Tab value={"notifications"} classes={classAction}   icon={<Notifications/>}/>
                <Tab component={RouterLink} classes={classAction}  value={"account"}  to="/mon-compte" icon={<AccountCircle/>}/>
                <Tab onClick={props.signOut} classes={classAction}   icon={<ExitToApp/>}/>
            </Tabs>
        </AppBar>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(MobileNavigation)