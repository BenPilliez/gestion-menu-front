import React from "react"
import {Avatar, Card, CardContent, CardHeader, CardMedia, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import moment from "moment";
import clsx from "clsx";
import {ExpandMore, FileCopy} from "@material-ui/icons";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CustomDialog from "./customDialog";
import {connect} from "react-redux"
import {copyMenu} from "../../store/actions/menuActions";
import 'moment/locale/fr'
import FormCopy from "../propositions/formCopy";

const CardLists = (props) => {

    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const useStyles = makeStyles((theme) => ({

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
    const {proposition} = props

    return (
        <Grid  item xs={12} lg={6} sm={6} md={6}   >
            <Card >
                <CardHeader
                    avatar={proposition.user.avatarUrl === null ?
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
                    image={`${process.env.REACT_APP_BASE_URL}/static/propositions/${proposition.imageUrl}`}
                    title={proposition.title}
                >
                </CardMedia>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {proposition.content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>

                    <IconButton aria-label="share" onClick={handleClickOpen}>
                        <FileCopy/>
                    </IconButton>

                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={() => handleExpandClick()}
                        aria-expanded={expanded}
                        aria-label="Description"
                    >
                        <ExpandMore/>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <span dangerouslySetInnerHTML={{__html: proposition.description}}/>
                    </CardContent>
                </Collapse>
            </Card>
            <CustomDialog
                title={"Copie le menu"}
                isOpen={open}
                handleClose={handleClose}
            >
                <FormCopy handleClose={handleClose} id={proposition.id}/>
            </CustomDialog>
        </Grid>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        copy: (id, day, week) => dispatch(copyMenu(id, day, week))
    }
}


export default connect(null, mapDispatchToProps)(CardLists)
