import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import  CheckoutSteps  from '../components/CheckoutSteps';
import { useHistory } from 'react-router-dom';




const Payment = () => {

    const [paymentMethod, setPaymentMethod] = useState('');

    const setPaymentMethodInput = (payment : string) => {
        setPaymentMethod(payment);
    };

    const dispatch = useDispatch();
    const history = useHistory();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(savePayment({paymentMethod}))
        history.push('/placeorder');
    };


    return (

        <div>
                <CheckoutSteps step1 step2 step3></CheckoutSteps>

                <div className='form'>

                    <form onSubmit={submitHandler}>

                        <ul className="form-container">

                            <li>
                                <h2>Payment</h2>
                            </li>

                            <li>
                                <input type="radio" name="payment" id="payment" value='paypal' onChange={(e) => setPaymentMethodInput(e.target.value)}/>
                                <label htmlFor="payment">PayPal</label>
                            </li>

                            <li>
                                <button type="submit" className="button primary">Continue</button>
                            </li>

                        </ul>

                    </form>

                </div>
        </div>
    )
}

export default Payment;