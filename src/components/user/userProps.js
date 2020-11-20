import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Delete, Edit, FileCopy} from '@material-ui/icons';
import moment from "moment"
import 'moment/locale/fr'
import CustomDialog from "../layout/customDialog";
import FormCopy from "../propositions/formCopy";
import EditMenuComponent from "../propositions/editMenu";
import AlertDialogSlide from "../propositions/alertDialog";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
        [theme.breakpoints.up('md') || theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(2)
        }
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
    const [isOpenCopy, setIsOpenCopy] = React.useState(false)
    const [isOpenEdit, setIsOpenEdit] = React.useState(false)
    const [isOpenDelete, setIsOpenDelete] = React.useState(false)

    const handleOpenCopy = () => {
        setIsOpenCopy(true)
    }

    const handleCloseCopy = () => {
        setIsOpenCopy(false)
    }

    const handleOpenDelete = () => {
        setIsOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setIsOpenDelete(false)
    }

    const handleOpenEdit = () => {
        setIsOpenEdit(true)
    }

    const handleCloseEdit = () => {
        setIsOpenEdit(false)
    }

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
                    <IconButton aria-label="copy" onClick={handleOpenCopy}>
                        <FileCopy/>
                    </IconButton>
                    <IconButton aria-label="edit" onClick={handleOpenEdit}>
                        <Edit/>
                    </IconButton>

                    <IconButton color={"secondary"} aria-label="delete" onClick={handleOpenDelete}>
                        <Delete/>
                    </IconButton>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={`${process.env.REACT_APP_BASE_URL}/static/propositions/${item.imageUrl}`}
                title="propositions cover"
            />

            <CustomDialog
                title={"Copie le menu"}
                isOpen={isOpenCopy}
                handleClose={handleCloseCopy}
            >
                <FormCopy handleClose={handleCloseCopy} id={item.id}/>
            </CustomDialog>

            <CustomDialog
                title={"Edition menu"}
                isOpen={isOpenEdit}
                handleClose={handleCloseEdit}
            >
                <EditMenuComponent
                    handleClose={handleCloseEdit}
                    id={item.id}
                    title={item.title}
                    content={item.content}
                    description={item.description}
                    day={item.day}
                    period={item.period}
                    week={item.week}
                    imageUrl={item.imageUrl}

                />
            </CustomDialog>

            <AlertDialogSlide
                isOpen={isOpenDelete}
                handleClose={handleCloseDelete}
                title={"Supprimer ?"}
                content={"Tu es sur le point de supprimer une proposition tu es bien sur ?"}
                id={item.id}/>

        </Card>
    );
}

export default UserProps
