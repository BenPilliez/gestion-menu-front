import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Card,
    Button,
    CardMedia,
    Dialog,
    Slide,
    CardContent,
    Typography
} from "@material-ui/core"
import {PlayCircleOutline} from '@material-ui/icons';
import SignIn from "./SignIn";
import Logo from "../../img/android-chrome-192x192.png"
import AppBars from "../layout/appBar";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    root: {
        maxWidth: 345,
        marginTop: theme.spacing(15),
        background: 'none'
    },
    media: {
        height: '100%',
        width: '100%',
    },
    bottomButton: {
        position: 'fixed',
        bottom: 0,
        marginBottom: theme.spacing(5)
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.container}>
            <Card elevation={0} className={classes.root}>
                <CardMedia
                    component={"img"}
                    className={classes.media}
                    image= {Logo}
                    title={"Allez on propose ses meilleurs repas"}
                />
                <CardContent>
                    <Typography >
                        Allez on propose ses meilleurs plats
                    </Typography>
                </CardContent>
            </Card>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBars handleClose={handleClose} />
                <SignIn/>
            </Dialog>
            <Button className={classes.bottomButton} variant="contained" startIcon={<PlayCircleOutline />} color="primary" onClick={handleClickOpen}>
                Se connecter
            </Button>
        </div>
    );
}
