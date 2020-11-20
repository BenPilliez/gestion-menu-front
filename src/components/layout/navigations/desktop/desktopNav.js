import React from "react"
import {connect} from "react-redux"
import {Link as RouterLink} from 'react-router-dom'
import {AppBar, Tabs, Tab, Toolbar, Typography} from "@material-ui/core"
import {AccountCircle, AddCircleOutline, Close, ExitToApp, Home, Notifications} from "@material-ui/icons";
import {signOut} from "../../../../store/actions/authActions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import {notifications, deleteNotifications} from "../../../../store/actions/notificationActions";
import moment from "moment"
import "moment/locale/fr"
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    toolBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
}))

const DesktopNav = (props) => {

    const classes = useStyles()
    const { notifications} = props
    console.log(notifications.length)

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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

    return (
        <AppBar className={classes.root} >
            <Toolbar className={classes.toolBar}>
                <Typography variant="h6" noWrap>
                    La bonne bouffe
                </Typography>

                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="labonne boufe nav"
                >

                    <Tab component={RouterLink} label="Accueil" to="/" icon={<Home/>}/>
                    <Tab component={RouterLink} label="Ajouter une proposition" to="/create/propositions"
                         icon={<AddCircleOutline/>}/>
                </Tabs>

                <div style={{display:'flex', flexDirection:'flex-end'}}>
                    <IconButton aria-label="users notifications" color="inherit" onClick={handleMenu}>
                        <Badge badgeContent={notifications.length} color="secondary">
                            <Notifications />
                        </Badge>
                    </IconButton>
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

                    <IconButton component={RouterLink} to={"/mon-compte"}>
                        <AccountCircle/>
                    </IconButton>
                    <IconButton onClick={props.signOut}>
                        <ExitToApp/>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(DesktopNav)
