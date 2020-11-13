import authReducer from "./authReducer";
import menuReducer from "./menuReducer"
import userReducer from "./userReducer";
import jumbotronReducer from "./jumbotronReducer"
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    menus: menuReducer,
    jumbo: jumbotronReducer,
    user: userReducer
})

export default rootReducer
