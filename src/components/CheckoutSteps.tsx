import React from 'react';
import './styles/checkout-steps.scss';

interface Steps {
    step1?: boolean;
    step2?: boolean;
    step3?: boolean;
    step4?: boolean;
}

const CheckoutSteps = ({step1, step2, step3, step4}: Steps) => {

    return (
        <div className="checkout-steps">
            <div className={step1 ? 'active' : ''}>Sign-in</div>
            <div className={step2 ? 'active' : ''}>Shipping</div>
            <div className={step3 ? 'active' : ''}>Payment</div>
            <div className={step4 ? 'active' : ''}>Place order</div>
        </div>
    )
}

export default CheckoutSteps;