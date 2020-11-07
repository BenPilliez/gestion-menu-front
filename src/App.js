import React, {Component} from "react"
import SignIn from "./components/auth/SignIn";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux"
import NavBar from "./components/layout/navbar";
import {Redirect} from "react-router-dom"
import {Dashboard} from "@material-ui/icons";

class App extends Component {
    render() {
        const {user} = this.props
        if(!user) return <SignIn />
        return (
            <BrowserRouter>
                <div className="App">
                    <NavBar/>
                    <Switch>
                        <Route exact path={"/"} component={Dashboard}/>
                    </Switch>
                </div>
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
