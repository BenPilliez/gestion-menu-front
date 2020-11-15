import React from "react"
import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
        appBar: {
            position: 'relative',
        },
}))

const AppBars = ({handleClose}) => {

    const classes = useStyles()

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <Close/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default AppBars
