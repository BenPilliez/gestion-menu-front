import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, applyMiddleware} from 'redux';
import rootReducers from './store/reducers/rootReducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {axiosInstance} from "./config/axiosConfig"
import {toast} from "react-toastify";
import CssBaseline from '@material-ui/core/CssBaseline';

const store = createStore(rootReducers, applyMiddleware(thunk.withExtraArgument({axiosInstance, toast})))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <CssBaseline />
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
