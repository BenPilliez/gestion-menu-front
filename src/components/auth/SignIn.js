import React, {Component} from "react"
import {connect} from "react-redux"
import {signIn} from "../../store/actions/authActions"


class SignIn extends Component {

    state = {
        username: null,
        password: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signIn(this.state)
    }

    render() {
        return (
            <div className={"container center"}>
                <div className="row">
                    <div className="col s12 ">
                        <div className={"card-panel login"}>
                            <form className={"white"} onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <h5 className="grey-text text-darken-3">Aller on se connecte</h5>
                                </div>
                                <div className="row">
                                    <div className="input-field s12 col">
                                        <i className={"material-icons prefix"}>account_circle</i>
                                        <label htmlFor="username">Pseudonyme</label>
                                        <input className={"validate"} type="text" id={"username"}
                                               onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field s12 col">
                                        <i className={"material-icons prefix"}>lock</i>
                                        <label htmlFor="password">Mot de passe</label>
                                        <input className={"validate"} type="password" id={"password"}
                                               onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col-12 right-align">
                                        <span className="margin right-align medium-small "><a href="#">T'as oublié ton mot de passe ?</a></span>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="input-field col s12 center-align">
                                        <button className="btn waves-effect waves-light pink lighten-1 z-depth-0 ">Se
                                            connecter
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
