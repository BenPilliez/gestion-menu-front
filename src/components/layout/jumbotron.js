import React from "react";
import NavBar from "./navigations/navbar";
import {makeStyles} from "@material-ui/core/styles";
import background from "../../img/background.jpg"
import {connect} from "react-redux"
import {Grid, Avatar, Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
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
        marginTop: !isMobile ? theme.spacing(30) : theme.spacing(10)
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20)
    },
    avatar :{
        paddingTop: !isMobile ? theme.spacing(5) : theme.spacing(20)
    }
}));

const Jumbotron = (props) => {
    const {title, showAvatar} = props.jumbo
    const {user} = props
    const classes = useStyles()

    const avatar = user.avatarUrl ? (<Avatar className={classes.large} alt={"avatar" + user.username}
                                             src={process.env.REACT_APP_BASE_URL + "/static/avatars/" + user.avatarUrl}/>
    ) : (<Avatar className={classes.large}>{user.username}</Avatar>)

    const grid = showAvatar ? (
        <Grid className={classes.avatar}>
            <Grid item>
                {avatar}
            </Grid>
        </Grid>) : null

    return (
        <div>
            <header className={classes.header}>
                <NavBar/>
                <Container>
                <Grid container direction={"row"} justify={"flex-start"} alignItems={"center"} className={classes.h1}>
                    <Grid item xs={12} sm={6} lg={12} md={6} className={classes.text} >
                        <Typography variant={"h3"}>
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
                {grid}
                </Container>
            </header>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        jumbo: state.jumbo,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Jumbotron)
