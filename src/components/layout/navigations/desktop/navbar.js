import React from "react"
import {connect} from "react-redux"
import {Link as RouterLink} from 'react-router-dom'
import {AppBar, Tabs, Tab, Toolbar, Typography} from "@material-ui/core"
import {signOut} from "../../../../store/actions/authActions";
import {AccountCircle, AddCircleOutline, ExitToApp, Home, Notifications} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Account from "../../../user/account";


const NavBar = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <AppBar>
            <Toolbar>
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
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Notifications/>
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
                        <MenuItem onClick={handleClose}>Pas encore de Notification</MenuItem>
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
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
