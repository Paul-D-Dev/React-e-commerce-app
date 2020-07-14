import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTravel } from '../actions/productActions';
import '../components/styles/sign-in.scss';



type payloadTravel = {
    loading: boolean,
    success: boolean,
    error: string,
}

interface Rootstate {
    createTravel: payloadTravel;
}

const Travels = () => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState('');
    

    const setNameInput = (name : string) => {
        setName(name);
    };
    const setCategoryInput = (category : string) => {
        setCategory(category);
    };
    const setImageInput = (image: string) => {
        setImage(image);
    };
    const setPriceInput = (price: number) => {
        setPrice(price);
    };
    const setStockInput = (stock: number) => {
        setStock(stock);
    };


    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createTravel({name, category, image, price, stock}))
    };

    const travaelSave = useSelector((state: Rootstate) => state.createTravel)
    const { loading, success, error } = travaelSave;

    const dispatch = useDispatch()

    useEffect(() => {        

    }, [])

    
    return (
        <div className='form'>

            <form onSubmit={submitHandler}>

                <ul className="form-container">

                    <li>
                        <h2>Add a new travel</h2>
                    </li>

                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                        {success && <div>Travel adding</div>}
                    </li>

                    <li>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" onChange={(e) => setNameInput(e.target.value)}/>
                    </li>

                    <li>
                        <label htmlFor="category">Category</label>
                        <input type="text" id="category" onChange={(e) => setCategoryInput(e.target.value)}/>
                    </li>

                    <li>
                        <label htmlFor="image">Image</label>
                        <input type="text" name="image" id="image" onChange={(e) => setImageInput(e.target.value)}/>
                    </li>

                    <li>
                        <label htmlFor="price">Price ($)</label>
                        <input type="number" name="price" id="price" value={price} onChange={(e) => setPriceInput(+e.target.value)}/>
                    </li>

                    <li>
                        <label htmlFor="stock">Stock</label>
                        <input type="number" name="stock" id="stock" value={stock} onChange={(e) => setStockInput(+e.target.value)}/>
                    </li>

                    <li>
                        <button type="submit" className="button primary">ADD</button>
                    </li>

                </ul>

            </form>



        </div>
       
    )
}

export default Travels;