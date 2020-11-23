import React from "react"
import {AppBar, Toolbar, Typography} from "@material-ui/core"
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
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
    root: {
        top: 'auto',
        bottom: 0,
        width: "100%",
        backgroundColor: theme.palette.primary.main,
    },
}))

/*
const styles = makeStyles((theme) => ({
    root: {
        color: "white",
        "&$selected": {
            color: "#303030"
        },
    },
    selected: {}
}))
*/


const MobileNavigation = (props) => {

    const classes = useStyles()
    const [value] = React.useState('home');

    const {notifications} = props

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


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
        <AppBar position="fixed" className={classes.root} value={value}>
            <Toolbar style={{display: 'flex', justifyContent: "space-between"}}>
                <IconButton component={RouterLink} to={"/"}>
                    <Home/>
                </IconButton>

                <IconButton component={RouterLink} to={"/create/propositions"}>
                    <AddCircleOutline/>
                </IconButton>

                <IconButton aria-label="users notifications" color="inherit" onClick={handleMenu}>
                    <Badge badgeContent={notifications.length} color="secondary">
                        <Notifications/>
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
                    {notifications.length > 0 ? notifications.map((item) => {
                        return <MenuItem key={item.id} style={{
                            display: 'flex',
                            justifyContent: "space-between",
                            whiteSpace: 'pre-wrap'
                        }}>
                            <Avatar alt={"img" + item.item}
                                    src={process.env.REACT_APP_BASE_URL + "/static/propositions/" + item.propositionImg}/>
                            <div>
                                <Typography variant={"h6"} color={"primary"} align={"left"}>
                                    {item.title}
                                    <IconButton onClick={() => deleteNotif(item.propositionsId)}
                                                style={{float: "right"}}>
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
                    }) : <MenuItem onClick={handleClose}>Pas encore de Notification</MenuItem>}
                </Menu>
                <IconButton component={RouterLink} to={"/mon-compte"}>
                    <AccountCircle/>
                </IconButton>
                <IconButton onClick={props.signOut}>
                    <ExitToApp/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
export default connect(null, mapDispatchToProps)(MobileNavigation)
