import React, {Component} from "react"
import M from "materialize-css/dist/js/materialize.min.js"
import SignIn from "./components/auth/SignIn";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    componentDidMount() {
        M.AutoInit();
    }

    render() {
        return (
            <div>
                <SignIn/>
                <ToastContainer autoClose={2000}/>
            </div>
        )
    }
}


export default App;
