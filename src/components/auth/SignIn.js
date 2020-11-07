import React, {Component} from "react"
import {connect} from "react-redux"
import {signIn} from "../../store/actions/authActions"
import clsx from 'clsx'
import {
    withStyles,
    Button,
    Link,
    Grid,
    Container,
    Typography,
    Avatar,
    OutlinedInput,
    InputAdornment,
    TextField,
    IconButton, FormControl, InputLabel
} from "@material-ui/core"
import {LockOutlined, Visibility, VisibilityOff} from "@material-ui/icons"

const useStyles = (theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        margin: {
            marginTop: theme.spacing(1)
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1)
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        }
    }
)

class SignIn extends Component {

    state = {
        username: '',
        password: '',
        showPassword: false
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signIn(this.state)
    }

    handleClickShowPassword = () => {
        this.setState({
            ...this.state,
            showPassword: !this.state.showPassword
        })
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    render() {
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Allez on se connecte
                    </Typography>
                    <form noValidate className={classes.form} onSubmit={this.handleSubmit}>
                        <TextField
                            id={"username"}
                            variant={"outlined"}
                            fullWidth
                            onChange={this.handleChange}
                            required
                            label={"Nom d'utilisateur"}
                            name={"username"}
                            type={"text"}
                            autoComplete={"username"}
                            autoFocus
                        />
                        <FormControl variant={"outlined"} className={classes.margin} fullWidth>
                            <InputLabel htmlFor={"password"}>Mot de passe *</InputLabel>
                            <OutlinedInput
                                className={classes.margin}
                                id="password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                onChange={this.handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
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
                            className={classes.submit}
                        >
                            Se connecter
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    T'as oublié ton mot de passe ?
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(SignIn))
