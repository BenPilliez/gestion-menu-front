import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from 'redux';
import rootReducers from './store/reducers/rootReducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {axiosInstance, setAuthorization} from "./config/axiosConfig"
import {toast} from "react-toastify";
import CssBaseline from '@material-ui/core/CssBaseline';

const store = createStore(rootReducers, applyMiddleware(thunk.withExtraArgument({axiosInstance, toast})))

const token = localStorage.getItem('token')

if (token) {
    setAuthorization(token)
}

// On maintient la connexion pendant 24h
let hours = 24 // Reset when storage is more than 24hours
let now = new Date().getTime()
let setupTime = localStorage.getItem('setupTime')
if (setupTime == null) {
    localStorage.setItem('setupTime', now)
} else {
    if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.clear()
        localStorage.setItem('setupTime', now)
    }
}


ReactDOM.render(
        <Provider store={store}>
            <CssBaseline/>
            <App/>
        </Provider>,

    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
