import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING } from './../constants/cartConstants';
import CartService from "../services/cart.service";
import Cookie from 'js-cookie';

const addToCart = (productId: string, quantity: number) => async (dispatch: any, getState: any) => {
    try {
        const data = await CartService.getCart(productId);
        dispatch({
            type : CART_ADD_ITEM, product : {
                id: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                stock: data.stock,
                quantity
            }
        });

        // we get the cat from the getState and we set a cookie = state
        const { cart: {cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }

    catch(error) {

    }
}

const removeFromCart = (productId: string) => (dispatch: any, getState: any) => {
    dispatch({ type: CART_REMOVE_ITEM, payload : productId});
    const { cart: {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

const saveShipping = (address: any) => (dispatch: any) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload : address});
}

export { addToCart, removeFromCart, saveShipping };