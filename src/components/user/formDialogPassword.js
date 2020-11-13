import React, {Component} from "react"
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";


class FormDialogPassword extends Component {

    state = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        showOldPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
    }
    handleClickShowPassword = (attribute) => {
        console.log(attribute)
        this.setState({
            ...this.state,
        [attribute]: !this.state[attribute]
        })
    }


    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormControl variant={"outlined"}  fullWidth>
                    <InputLabel htmlFor={"oldPassword"}>Ancien mot de passe *</InputLabel>
                    <OutlinedInput
                        id="oldPassword"
                        type={this.state.showOldPassword ? 'text' : 'password'}
                        onChange={this.handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Montrer le mot de passe"
                                    onClick={(e) => {e.preventDefault(); this.handleClickShowPassword('showOldPassword')}}
                                >
                                    {this.state.showOldPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>

                        }
                        required
                        labelWidth={100}
                    />
                </FormControl>

                <FormControl variant={"outlined"}  fullWidth>
                    <InputLabel htmlFor={"password"}>Nouveau mot de passe*</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={this.state.showNewPassword ? 'text' : 'password'}
                        onChange={this.handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Montrer le mot de passe"
                                    onClick={(e) => {e.preventDefault(); this.handleClickShowPassword('showNewPassword')}}
                                >
                                    {this.state.showNewPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>

                        }
                        required
                        labelWidth={100}
                    />
                </FormControl>
                <FormControl variant={"outlined"}  fullWidth>
                    <InputLabel htmlFor={"confirmPassword"}>Confirmation mot de passe *</InputLabel>
                    <OutlinedInput
                        id="confirmPassword"
                        type={this.state.showConfirmPassword ? 'text' : 'password'}
                        onChange={this.handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Montrer le mot de passe"
                                    onClick={(e) => {e.preventDefault(); this.handleClickShowPassword('showConfirmPassword')}}
                                >
                                    {this.state.showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>

                        }
                        required
                        labelWidth={100}
                    />
                </FormControl>
                <Button
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

export default FormDialogPassword
