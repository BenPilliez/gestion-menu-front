import authReducer from "./authReducer";
import menuReducer from "./menuReducer"
import {combineReducers} from "redux";

const rootReducer = combineReducers( {
    auth: authReducer,
    menus: menuReducer
})

export default rootReducer
