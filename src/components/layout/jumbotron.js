import React from "react";
import NavBar from "./navbar";
import clsx from "clsx"
import {makeStyles} from "@material-ui/core/styles";
import background from "../../img/background.jpg"
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        width: '100%'
    },
    h1: {
        color: "#FFF",
        marginTop: theme.spacing(30)
    }

}));

const Jumbotron = (props) => {
    const {title} = props
    const classes = useStyles()
    return (
        <div>
            <header className={clsx(classes.header, 'header')}>
                <NavBar/>
                <Grid container direction={"row"} justify={"start"} alignItems={"center"} className={classes.h1}>
                    <Grid item xs={6} sm={6} lg={12} md={6} className={classes.text}>
                        <Typography  variant="h1">
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
            </header>
        </div>
    )
}

export default Jumbotron
