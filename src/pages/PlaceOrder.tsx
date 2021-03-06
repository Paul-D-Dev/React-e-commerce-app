import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import BackButton from '../components/BackButton';
import CheckoutSteps from '../components/CheckoutSteps';
import '../components/styles/cart.scss';
import './styles/place-order.scss'
import { ProductReducer } from '../models/product';


type Cart = {
    cartItems: ProductReducer[],
    shipping: Shipping,
    payment: Payment
}

interface Rootstate {
    cart : Cart
}

interface Shipping {
    address: string,
    city: string,
    zip: string,
    country: string
}

interface Payment {
    paymentMethod: string
}


const PlaceOrder = () => {
    const history = useHistory();
    

    // Acces to cart from the store redux
    const cart = useSelector((state: Rootstate) => state.cart)

    // Direct access to the array of cart
    const { cartItems, shipping, payment } = cart;

    if(!shipping) {
        history.push('/shipping');
    } else if (!payment) {
        history.push('/payment');
    }
    
    const subTotalMethod = (cartItems: ProductReducer[]) => {
        let qty = 0;
        let price = 0;
        for (const item of cartItems) {               
            qty = qty + item.quantity;
            price = price + item.price * item.quantity;       
        }
        return {qty, price};
    }

    const subTotal = subTotalMethod(cartItems);
    const itemsPrice = subTotal.qty * subTotal.price;
    const taxPrice = 0.2 * itemsPrice;
    const totalPrice = itemsPrice + taxPrice;


    const placeOrderHandler = () => {

    }

    return (
        <div>

            <div>
                <BackButton/>
            </div>

            <div>
                <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            </div>

            <div className="placeorder">
            
                <div className="placeorder-infos">

                    <div>
                        <h3>Shipping</h3>
                        <div>
                            {shipping.address}, {shipping.city}, {shipping.zip}, {shipping.country}
                        </div>
                    </div>

                    <div>
                        <h3>Payment</h3>
                        <div>
                            Payment Method : {payment.paymentMethod}
                        </div>
                    </div>

                    <ul className="cart-list-container">
                        <li>
                            <h3>Shopping Cart</h3>
                            <h4>Price</h4>
                        </li>

                        {
                            cartItems.length === 0 ? 
                                <div>Cart is empty</div>
                            :
                                cartItems.map( item => 
                                    <li key={item._id}>

                                        <div className="cart-img">
                                            <img src={item.image} alt={item.name}/>
                                        </div>

                                        <div className="cart-name">
                                            <Link to={"/products/" + item._id}>{item.name}</Link>
                                            <div>
                                                Quantity : {item.quantity}
                                            </div>
                                        </div>

                                        <div className="cart-price">$ {item.price}</div>

                                    </li>
                                )
                        }
                    </ul>

                </div>

                <div className="placeorder-action">

                    <button className="button primary width100" onClick={placeOrderHandler}>Place Order</button>
                    <ul>
                        <li>
                            <h3>Order Summury</h3>
                        </li>
                        <li>
                            <div>Items :</div>
                            <div>$ {itemsPrice}</div>
                        </li>
                        <li>
                            <div>Tax :</div>
                            <div>$ {taxPrice}</div>
                        </li>
                        <li>
                            <div>Order total</div>
                            <div>$ {totalPrice}</div>
                        </li>
                    </ul>

                </div>

            </div>

        </div>
    )
}

export default PlaceOrder;