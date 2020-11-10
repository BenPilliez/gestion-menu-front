import React from "react"
import {Avatar, Card, CardContent, CardHeader, CardMedia, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import moment from "moment";
moment.locale('fr')

const CardLists = ({proposition}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        flex:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        }
    }));

    const classes = useStyles()

    return (
        <Grid item xs={12} lg={6} md={6} sm={12} style={{marginTop: 15}}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={ proposition.user.avatarUrl === null ?
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {proposition.user.username}
                        </Avatar> :
                        <Avatar className={classes.large} alt={"avatar" + proposition.user.username}
                                src={process.env.REACT_APP_BASE_URL + "/static/avatars/" + proposition.user.avatarUrl}/>
                    }
                    title={proposition.title}
                    subheader={moment(proposition.createdAt).locale('fr').format('LL')}
                >
                </CardHeader>
                <CardMedia
                    className={classes.media}
                    image= {`${process.env.REACT_APP_BASE_URL}/static/propositions/${proposition.imageUrl}`}
                    title={proposition.title}
                >
                </CardMedia>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {proposition.content}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default CardLists
