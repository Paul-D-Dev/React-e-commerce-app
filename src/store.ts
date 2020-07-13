import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { productListReducer, productDetailReducer } from "./reducers/productReducers";
import { cartReducer } from './reducers/cartReducer';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

const cartItems = Cookie.getJSON('cartItems') || [];

const initialState = {cart: {cartItems}};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer
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