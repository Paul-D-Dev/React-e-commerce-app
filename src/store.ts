import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { productListReducer, productDetailReducer, createTravelReducer, deleteTravelReducer } from "./reducers/productReducers";
import { cartReducer } from './reducers/cartReducer';
import { userSignInReducer, userRegisterReducer } from './reducers/userReducer';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

// Get back the cart saved when we add to cart to have all the products in the initial state
const cartItems = Cookie.getJSON('cartItems') || [];

const userInfos = Cookie.getJSON('userInfos') || false;

const initialState = {cart: {cartItems}, userSignin : {userInfos}, userRegister: {userInfos}};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    userSignin: userSignInReducer,
    userRegister: userRegisterReducer,
    createTravel: createTravelReducer,
    deleteTravel: deleteTravelReducer 
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