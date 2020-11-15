import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Delete, Settings} from '@material-ui/icons';
import {isMobile} from "react-device-detect"
import moment from "moment"
import 'moment/locale/fr'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
        marginLeft: isMobile ? null : theme.spacing(2)
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 600
    },
    cover: {
        width: 200,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

const UserProps = ({item}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {item.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {moment().day(item.day).week(item.week).format('LL')}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <IconButton aria-label="previous">
                        <Delete/>
                    </IconButton>
                    <IconButton aria-label="next">
                        <Settings/>
                    </IconButton>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={`${process.env.REACT_APP_BASE_URL}/static/propositions/${item.imageUrl}`}
                title="Live from space album cover"
            />
        </Card>
    );
}

export default UserProps
