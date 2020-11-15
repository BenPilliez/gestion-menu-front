import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {deleteMenu} from "../../store/actions/authActions";
import {connect} from "react-redux"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const  AlertDialogSlide = ({isOpen,title,handleClose, content, id, deleteProps}) => {

    const handleSubmit = () => {
        deleteProps(id)
        handleClose()
    }

    return (
        <div>
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Non
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Bien sur
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapDispatchTopProps = (dispatch) => {
    return {
        deleteProps: (id) => dispatch(deleteMenu(id))
    }
}

export default connect(null, mapDispatchTopProps)(AlertDialogSlide)
