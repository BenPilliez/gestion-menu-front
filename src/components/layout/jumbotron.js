import React from "react";
import NavBar from "./navigations/navbar";
import {makeStyles} from "@material-ui/core/styles";
import background from "../../img/background.jpg"
import {isMobile} from "react-device-detect"


const useStyles = makeStyles((theme) => ({
    header: {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: isMobile ? '80vh' : '100vh',
        width: '100%'
    },
    h1: {
        color: "#FFF",
        marginTop: !isMobile ? theme.spacing(30) : theme.spacing(0)
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20)
    },
}));

const Jumbotron = (props) => {
    const classes = useStyles()

    return (
        <div>
            <header className={classes.header}>
                <NavBar/>
            </header>
        </div>
    )
}

export default Jumbotron
