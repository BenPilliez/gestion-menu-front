import React from "react"
import {AppBar, Tab, Tabs, Toolbar, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {Link as RouterLink} from "react-router-dom";
import {AccountCircle, AddCircleOutline, Close, ExitToApp, Home, Notifications} from "@material-ui/icons";
import {signOut} from "../../../../store/actions/authActions";
import {connect} from "react-redux"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import {deleteNotifications, notifications} from "../../../../store/actions/notificationActions";

const useStyles = makeStyles((theme) => ({
    root: {
        top: 'auto',
        bottom: 0,
        width: "100%",
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

    const { notifications} = props

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    React.useEffect(() => {
        if(props.dataLoading) {
            props.getNotifications()
        }
    })

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteNotif = (propId) => {
        props.deleteNotification(propId)
        setAnchorEl(null)
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AppBar position="fixed" className={classes.root}>
            <Toolbar>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab component={RouterLink} classes={classAction} value={"home"} to="/" icon={<Home/>}/>
                    <Tab component={RouterLink} classes={classAction} value={"create"} to="/create/propositions"
                         icon={<AddCircleOutline/>}/>

                    <Tab component={RouterLink} classes={classAction} value={"account"} to="/mon-compte"
                         icon={<AccountCircle/>}/>
                    <Tab onClick={props.signOut} classes={classAction} icon={<ExitToApp/>}/>
                </Tabs>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    {notifications.length > 0 ? notifications.map((item)=> {
                        return <MenuItem key={item.id} style={{display: 'flex', justifyContent: "space-between"}}>
                            <Avatar  alt={"img" + item.item}
                                     src={process.env.REACT_APP_BASE_URL + "/static/propositions/" + item.propositionImg}/>
                            <div >
                                <Typography variant={"h6"} color={"primary"} align={"left"}>
                                    {item.title}
                                    <IconButton onClick={() => deleteNotif(item.propositionsId)} style={{float: "right"}}>
                                        <Close/>
                                    </IconButton>
                                </Typography>
                                <Typography>
                                    {item.message}
                                </Typography>
                                <Typography variant={"caption"}>
                                    Crée le {moment(item.createdAt).format('LL')}
                                </Typography>
                            </div>
                        </MenuItem>
                    }) : <MenuItem onClick={handleClose}>Pas encore de Notification</MenuItem> }
                </Menu>
            </Toolbar>
        </AppBar>
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
export default connect(mapStateToProps, mapDispatchToProps)(MobileNavigation)
