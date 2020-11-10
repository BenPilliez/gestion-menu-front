import React, {Component} from "react"
import SignIn from "./components/auth/SignIn";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux"
import dashboard from "./components/dashboard/dashboard";
import Jumbotron from "./components/layout/jumbotron";
import Account from "./components/user/account";
import detailMenu from "./components/propositions/detailMenu"
import addMenuComponent from "./components/propositions/addMenu";

class App extends Component {
    render() {
        const {user} = this.props
        if (!user) return <div><SignIn/> <ToastContainer/></div>
        return (
            <BrowserRouter>
                <div className="App">
                    <Jumbotron  />
                    <Switch>
                        <Route exact path={"/"} component={dashboard}/>
                        <Route path={'/signin'} component={SignIn} />
                        <Route path={"/mon-compte"} component={Account} />
                        <Route path={"/details/:day"} component={detailMenu} />
                        <Route path={"/create/propositions/"} component={addMenuComponent} />
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
