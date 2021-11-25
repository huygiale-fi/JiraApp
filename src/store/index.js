import { applyMiddleware, combineReducers, createStore } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import authReducer from "./reducers/authReducer";
import projectReducer from "./reducers/projectReducer";
const rootReducer = combineReducers({
    authReducer:authReducer,
    projectReducer:projectReducer,
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)
export default store;