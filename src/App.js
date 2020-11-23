import React, {Component} from "react"
import SignIn from "./components/auth/SignIn";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux"
import dashboard from "./components/dashboard/dashboard";
import Account from "./components/user/account";
import addMenuComponent from "./components/propositions/addMenu";
import ConnectPannel from "./components/auth/connectPanel";
import AppNav from "./components/layout/navigations/AppBar/AppNav";
import {Socket} from "./helpers/socket";
import {addToStorage, deleteItemFromStorage, editToStorage} from "./store/actions/menuActions"
import {notifications} from "./store/actions/notificationActions";

const socket = Socket()

class App extends Component {

    componentDidMount() {
        socket.on('PropCreated', (response) => {
            this.props.addToStorage(response, response.day, response.week)
            this.props.notifications()
        })

        socket.on('PropDelete', (response) => {
            this.props.deleteItemStorage(response.day, response.week, response.id)
        })

        socket.on('PropEdited', (response) => {
            this.props.edit(response, response.day, response.week)
        })

    }

    render() {
        const {user} = this.props
        if (!user) return <div><ConnectPannel/> <ToastContainer/></div>

        return (
            <BrowserRouter>
                <div className="App">
                    <AppNav/>
                    <Switch>
                        <Route exact path={"/"} component={dashboard}/>
                        <Route path={'/signin'} component={SignIn}/>
                        <Route path={"/mon-compte"} component={Account}/>
                        <Route path={"/create/propositions/"} component={addMenuComponent}/>
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

const mapDispatchToProps = (dispatch) => {
    return {
        addToStorage: (data, day, weekNumber) => dispatch(addToStorage(data, day, weekNumber)),
        deleteItemStorage: (day, week, item) => dispatch(deleteItemFromStorage(day, week, item)),
        edit: (data, day, week) => dispatch(editToStorage(data, day, week)),
        notifications: () => dispatch(notifications()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
