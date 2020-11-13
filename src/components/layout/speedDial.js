import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {Face, Lock, Settings} from "@material-ui/icons";
import CustomDialog from "../layout/customDialog"
import FormDialogPassword from "../user/formDialogPassword";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 380,
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));


export default function SpeedDialTooltipOpen() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [isOpenMdp, setIsOpenMdp] = React.useState(false)
    const [isOpenAvatar, setIsOpenAvatar] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, operation) => {

        if (operation === "mdp") {
            setIsOpenMdp(true)
        } else if (operation === "avatar") {
            setIsOpenAvatar(true)
        }

        setOpen(false);
    };

    const handleCloseDialogAvatar = () => {
        setIsOpenAvatar(false)
    }

    const handleCloseDialogMdp = () => {
        setIsOpenMdp(false)
    }

    const actions = [
        {icon: <Lock/>, name: 'MDP', id: 'mdp', operation: 'mdp'},
        {icon: <Face/>, name: 'Avatar', id: 'avatar', operation: 'avatar'},
    ];

    return (
        <div className={classes.root}>
            <Backdrop open={open}/>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                className={classes.speedDial}
                icon={<SpeedDialIcon icon={<Settings/>}/>}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        open={open}
                        tooltipOpen
                        onClick={(e) => {
                            handleClose(e, action.operation)
                        }}
                        title={action.name}
                        id={action.id}
                    />
                ))}
            </SpeedDial>

            <CustomDialog
                title={"Change ton mot de passe"}
                isOpen={isOpenMdp}
                handleClose={handleCloseDialogMdp}
            >
                <FormDialogPassword/>

            </CustomDialog>

            <CustomDialog
                title={"Change ton avatar"}
                isOpen={isOpenAvatar}
                handleClose={handleCloseDialogAvatar}
            >
            </CustomDialog>
        </div>
    );
}
