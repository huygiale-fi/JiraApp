import { applyMiddleware, combineReducers, createStore } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import authReducer from "./reducers/authReducer";
import projectReducer from "./reducers/projectReducer";
import taskReducer from "./reducers/taskReducer";
const rootReducer = combineReducers({
    authReducer:authReducer,
    projectReducer:projectReducer,
    taskReducer:taskReducer
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)
export default store;