import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './../constants/cartConstants';
import CartService from "../services/cart.service";
import Cookie from 'js-cookie';

const addToCart = (productId: number, qty: number) => async (dispatch: any, getState: any) => {
    try {
        const data = await CartService.getCart(productId);
        dispatch({
            type : CART_ADD_ITEM, product : {
                id: data.id,
                name: data.name,
                image: data.image,
                price: data.price,
                stock: data.quantity,
                qty
            }
        });
        const { cart: {cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }

    catch(error) {

    }
}

const removeFromCart = (productId: number) => (dispatch: any, getState: any) => {
    dispatch({ type: CART_REMOVE_ITEM, payload : productId});

}

export {addToCart, removeFromCart};