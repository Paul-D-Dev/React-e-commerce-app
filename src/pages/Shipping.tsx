import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';




const Shipping = () => {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');

    const setAddressInput = (address : string) => {
        setAddress(address);
    };

    const setCityInput = (city : string) => {
        setCity(city);
    };

    const setCountryInput = (country: string) => {
        setCountry(country);
    };
    
    const setZipInput = (zip: string) => {
        setZip(zip);
    };

    const dispatch = useDispatch();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(saveShipping({address, city, country, zip}))
    };


    return (
        <div className='form'>

        <form onSubmit={submitHandler}>

            <ul className="form-container">

                <li>
                    <h2>Shipping</h2>
                </li>

                <li>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" onChange={(e) => setAddressInput(e.target.value)}/>
                </li>

                <li>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" onChange={(e) => setCityInput(e.target.value)}/>
                </li>

                <li>
                    <label htmlFor="zip">Zip Code</label>
                    <input type="text" name="zip" id="zip" onChange={(e) => setZipInput(e.target.value)}/>
                </li>

                <li>
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country" id="country" onChange={(e) => setCountryInput(e.target.value)}/>
                </li>

                <li>
                    <button type="submit" className="button primary">Continue</button>
                </li>

            </ul>

        </form>

    </div>
    )
}

export default Shipping;