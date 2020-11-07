import React from "react"
import {List, ListItemIcon, ListItemText, ListItemAvatar, Divider, ListItem, Avatar} from "@material-ui/core"
import {AddCircleOutline, AccountBox} from '@material-ui/icons';
import clsx from "clsx"
import {makeStyles} from "@material-ui/core/styles";

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
        }
    }))

    const classes = useStyles()

    return (
        <List>
            {anchor !== "bottom" ?
            <ListItem button className={classes.avatar}>
                 <ListItemAvatar>
                    {!user.avatarUrl ?
                        <Avatar className={clsx(classes.large)}>{user.username}</Avatar> :
                        <Avatar className={clsx(classes.large)} alt={"avatar" + user.username}
                                src={process.env.REACT_APP_BASE_URL + "/static/avatars/" + user.avatarUrl}/>}
                </ListItemAvatar> <Divider className={classes.margin2}/>
            </ListItem> : null}
            <ListItem button className={classes.margin4}>
                <ListItemIcon><AddCircleOutline/></ListItemIcon>
                <ListItemText> Mon compte </ListItemText>
            </ListItem>
            <ListItem button>
                <ListItemIcon><AccountBox/></ListItemIcon>
                <ListItemText> Ajouter une proposition
                </ListItemText>
            </ListItem>
        </List>
    )
}

export default SideBarLinks
