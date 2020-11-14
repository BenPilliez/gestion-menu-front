import authReducer from "./authReducer";
import menuReducer from "./menuReducer"
import userReducer from "./userReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    menus: menuReducer,
    user: userReducer
})

export default rootReducer
