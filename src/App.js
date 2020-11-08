import React, {Component} from "react"
import SignIn from "./components/auth/SignIn";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux"
import dashboard from "./components/dashboard/dashboard";
import Jumbotron from "./components/layout/jumbotron";

class App extends Component {
    render() {
        const {user} = this.props
        if (!user) return <div><SignIn/> <ToastContainer/></div>
        return (
            <BrowserRouter>
                <div className="App">
                    <Jumbotron title={"Bon qu'est ce qu'on mange ce soir ?"} />
                    <Switch>
                        <Route exact path={"/"} component={dashboard}/>
                        <Route path={'/signin'} component={SignIn} />
                    </Switch>
                    <ToastContainer/>
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
