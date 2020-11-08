import authReducer from "./authReducer";
import menuReducer from "./menuReducer"
import jumbotronReducer from "./jumbotronReducer"
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    menus: menuReducer,
    jumbo: jumbotronReducer
})

export default rootReducer
