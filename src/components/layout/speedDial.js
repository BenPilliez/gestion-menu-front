import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {Edit, Face, Lock} from "@material-ui/icons";

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

const actions = [
    {icon: <Lock/>, name: 'MDP',  operation:'mdp'},
    {icon: <Face/>, name: 'Avatar',  operation:'avatar'},
];

export default function SpeedDialTooltipOpen() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [isOpenMdp, setIsOpenMdp] = React.useState(false)
    const [isOpenAvatar, setIsOpenAvatar] = React.useState(false)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDialog = (e,operation) => {
       if(operation === "mdp"){
           setIsOpenMdp(!isOpenMdp)
           console.log(isOpenMdp)
       }
       handleClose()
    };

    return (
        <div className={classes.root}>
            <Backdrop open={open}/>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                className={classes.speedDial}
                icon={<SpeedDialIcon icon={<Edit/>}/>}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={(e) => handleDialog(e,action.operation)}
                        title={action.name}
                        id={action.ref}
                    />
                ))}
            </SpeedDial>

        </div>
    );
}
