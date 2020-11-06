import React, {Component} from "react"
import SignIn from "./components/auth/SignIn";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux"
import NavBar from "./components/layout/navbar";


class App extends Component {
    render() {
        const {user} = this.props
        return (
            <BrowserRouter>
                <SignIn />
                <NavBar/>
                <Switch>
                </Switch>
                <ToastContainer autoClose={2000}/>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}


export default connect(mapStateToProps)(App);
