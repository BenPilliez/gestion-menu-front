import React from "react"
import {makeStyles} from "@material-ui/core/styles";
import {Visibility} from "@material-ui/icons";
import {Paper, Card, CardMedia, CardContent, CardActions, Typography, Grid, Button} from "@material-ui/core"
import {Link as RouterLink} from "react-router-dom";
import moment from "moment";
moment.locale('fr')

const CarouselItems = (props) => {
    const {header, content, media} = props.item
    const useStyles = makeStyles({
        root: {
            with: '100%',
        },
        media: {
            height: '100%'
        },
    });
    const classes = useStyles()
    return (
        <Paper>
            <Card className={classes.root}>
                <Grid container direction={"column"} alignItems={"center"}>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image={media.url}
                        title={media.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {header}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button component={RouterLink} to={`/details/${header}?week=${moment().week()}`} startIcon={<Visibility />} variant={"contained"} color={"primary"}>Voir le menu</Button>
                    </CardActions>
                </Grid>
            </Card>
        </Paper>
    )
}

export default CarouselItems
