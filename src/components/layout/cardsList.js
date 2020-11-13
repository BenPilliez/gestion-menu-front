import React from "react"
import {Avatar, Card, CardContent, CardHeader, CardMedia, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import moment from "moment";
import clsx from "clsx";
import {ExpandMore} from "@material-ui/icons";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
moment.locale('fr')

const CardLists = ({proposition}) => {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
                    title={`${proposition.title} (${proposition.period})`}
                    subheader={moment().day(proposition.day).week(proposition.week).format('LL')}
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
                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="Description"
                    >
                        <ExpandMore />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent >
                        <span dangerouslySetInnerHTML={{__html: proposition.description}}/>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    )
}

export default CardLists
