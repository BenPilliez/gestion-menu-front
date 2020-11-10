import React from "react"
import {List, ListItemIcon, ListItemText, ListItemAvatar, Divider, ListItem, Avatar, Button} from "@material-ui/core"
import {AddCircleOutline, AccountBox, Home} from '@material-ui/icons';
import {makeStyles} from "@material-ui/core/styles";
import { Link as RouterLink } from 'react-router-dom';
import clsx from "clsx"

const SideBarLinks = (props) => {
    const {user, anchor} = props
    const useStyles = makeStyles((theme) => ({
        avatar: {
            display: 'flex',
            justifyContent: 'center'
        },
        large: {
            width: theme.spacing(20),
            height: theme.spacing(20)
        },
        margin4: {
            marginTop: theme.spacing(4)
        },
        margin2: {
            marginTop: theme.spacing(2)
        },
        button:{
            display: 'flex',
            justifyContent: 'center',
        }
    }))

    const classes = useStyles()

    return (
        <List>
            {anchor !== "bottom" ?
            <ListItem button className={classes.avatar}>
                 <ListItemAvatar>
                    {!user.avatarUrl ?
                        <Avatar className={classes.large}>{user.username}</Avatar> :
                        <Avatar className={classes.large} alt={"avatar" + user.username}
                                src={process.env.REACT_APP_BASE_URL + "/static/avatars/" + user.avatarUrl}/>}
                </ListItemAvatar> <Divider className={classes.margin2}/>
            </ListItem> : null}

            <ListItem button className={classes.margin4} component={RouterLink} to={"/"}>
                <ListItemIcon><Home/></ListItemIcon>
                <ListItemText> Accueil </ListItemText>
            </ListItem>

            <ListItem button component={RouterLink} to={"/mon-compte"}>
                <ListItemIcon><AddCircleOutline/></ListItemIcon>
                <ListItemText> Mon compte </ListItemText>
            </ListItem>
            <ListItem button component={RouterLink} to={"/create/propositions/"}>
                <ListItemIcon><AccountBox/></ListItemIcon>
                <ListItemText> Ajouter une proposition
                </ListItemText>
            </ListItem>

            <Divider  />

            <ListItem  className={clsx(classes.button, classes.margin4)} >
              <Button variant={"contained"} color={"secondary"} onClick={props.signOut}>Se déconnecter</Button>
            </ListItem>
        </List>
    )
}
export default SideBarLinks