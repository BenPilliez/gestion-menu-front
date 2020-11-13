import React, {Component} from "react"
import {Button,withStyles} from "@material-ui/core";
import {connect} from "react-redux"
import {clearState, passwordUpdate} from "../../store/actions/userActions";
import {DropzoneArea} from "material-ui-dropzone";
import {avatarUpdate} from "../../store/actions/userActions";
import {converFormToFormData} from "../../helpers/convertFormToFomdata";

const classes = (theme) => ({
    spacing: {
        marginTop: theme.spacing(2)
    }
})

class FormDialogAvatar extends Component {

    state = {
        avatar: '',
        error: false,
        errorMessage: '',
    }

    handleFile = (file) => {
        this.setState({
            ...this.state,
            avatar: file[0]
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const formData = converFormToFormData(this.state)
        this.props.updateAvatar(formData, this.props.id)
        this.props.handleClose()
    }
    componentDidMount() {
        this.props.clearState()
    }

    render() {
        const {classes} = this.props

        return (
            <form onSubmit={this.handleSubmit}>
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText={"Dépose ton image ou clique"}
                    onChange={(files) => this.handleFile(files)}
                    getFileAddedMessage={(files) => {
                        return `L'image ${files} a été ajouté`
                    }}
                />

                <Button
                    className={classes.spacing}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Modifier
                </Button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.user.id,
        error: state.user.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAvatar: (form, id) => dispatch(avatarUpdate(form, id)),
        clearState: () => dispatch(clearState())
    }
}

export default withStyles(classes)(connect(mapStateToProps, mapDispatchToProps)(FormDialogAvatar))
