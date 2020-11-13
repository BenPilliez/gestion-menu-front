import React, {Component} from "react"
import {Button, FormControl, IconButton, InputAdornment, withStyles} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {connect} from "react-redux"
import {clearState, passwordUpdate} from "../../store/actions/userActions";
import TextField from "@material-ui/core/TextField";


const classes = (theme) => ({
    spacing: {
        marginTop: theme.spacing(2)
    }
})

class FormDialogPassword extends Component {

    state = {
        oldPassword: '',
        error: false,
        errorMessage: '',
        confirmPassword: '',
        invalidConfirm: false,
        invalidConfirmMessage: '',
        showOldPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
    }

    handleClickShowPassword = (attribute) => {
        this.setState({
            ...this.state,
            [attribute]: !this.state[attribute]
        })
    }

    handleChange = (e) => {
        if(e.target.id === 'confirmPassword'){
            this.handleValidate()
        }
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    handleValidate = () => {
        if(this.state.password !== this.state.confirmPassword){
            this.setState( {
                invalidConfirm: true,
                invalidConfirmMessage: 'Les mot de passes ne correspondent pas'
            })
        }else{
            this.setState({
                invalidConfirm: false,
                invalidConfirmMessage: ''
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(!this.state.invalidConfirm){
            if(this.state.error && this.state.errorMessage){
                this.setState({
                    error: false,
                    errorMessage:''
                })
            }
            this.props.updatePassword(this.state, this.props.id)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.error && prevProps.error !== this.props.error) {
                this.setState({
                    error: true,
                    errorMessage: this.props.error
                })
        } else if (this.props.error === null && this.props.passwordUpdate) {
            this.props.handleClose()
            this.props.clearState()
        }
    }

    componentDidMount() {
        this.props.clearState()
    }

    render() {

        const {classes} = this.props
        const {error,errorMessage, invalidConfirm, invalidConfirmMessage} = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <FormControl variant={"outlined"} className={classes.spacing}  fullWidth>
                    <TextField
                        variant={"outlined"}
                        label={"Ancien mot de passe"}
                        id="oldPassword"
                        error={error}
                        helperText={errorMessage.error}
                        type={this.state.showOldPassword ? 'text' : 'password'}
                        onChange={this.handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Montrer le mot de passe"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.handleClickShowPassword('showOldPassword')
                                        }}
                                    >
                                        {this.state.showOldPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>)

                        }}
                        required
                    />
                </FormControl>

                <FormControl variant={"outlined"} className={classes.spacing} fullWidth>
                    <TextField
                        id="password"
                        label={"Nouveau mot de passe"}
                        type={this.state.showNewPassword ? 'text' : 'password'}
                        onChange={this.handleChange}
                        variant={"outlined"}
                        error={this.state.invalidConfirm}
                        helperText={this.state.invalidConfirmMessage}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Montrer le mot de passe"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.handleClickShowPassword('showNewPassword')
                                        }}
                                    >
                                        {this.state.showNewPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        required
                    />
                </FormControl>
                <FormControl variant={"outlined"} className={classes.spacing} fullWidth>
                    <TextField
                        label={"Confirmation mot de passe"}
                        variant={"outlined"}
                        id="confirmPassword"
                        type={this.state.showConfirmPassword ? 'text' : 'password'}
                        onChange={this.handleChange}
                        error={invalidConfirm}
                        helperText={invalidConfirmMessage}
                        onBlur={this.handleValidate}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Montrer le mot de passe"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.handleClickShowPassword('showConfirmPassword')
                                        }}
                                    >
                                        {this.state.showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        required
                    />
                </FormControl>
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
        passwordUpdate: state.user.passwordUpdate,
        error: state.user.error}
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePassword: (form, id) => dispatch(passwordUpdate(form, id)),
        clearState: () => dispatch(clearState())
    }
}

export default withStyles(classes)(connect(mapStateToProps, mapDispatchToProps)(FormDialogPassword))
