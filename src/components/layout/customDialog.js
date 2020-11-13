import React from "react"
import {Dialog, DialogContent, DialogTitle, IconButton} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

const CustomDialog = ({isOpen, title, handleClose, children}) => {
    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth>
            <DialogTitle>
                {title}
                <IconButton aria-label="close" onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog
