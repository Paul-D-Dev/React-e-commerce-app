import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { productListReducer } from "./reducers/productReducers";
import thunk from 'redux-thunk';


const initialState = {};
const reducer = combineReducers({
    productList: productListReducer
})

// Need to declare global to use Redux DEVTOOLS Extension
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
// Thunk is middleware for async in the redux

export default store;