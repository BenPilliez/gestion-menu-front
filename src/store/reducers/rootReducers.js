import authReducer from "./authReducer"
import menuReducer from "./menuReducer"
import userReducer from "./userReducer"
import notificationsReducer from "./notificationsReducer"
import {combineReducers} from "redux"

const rootReducer = combineReducers({
    auth: authReducer,
    menus: menuReducer,
    user: userReducer,
    notifications: notificationsReducer
})

export default rootReducer
