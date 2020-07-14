import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTravel, listProducts } from '../actions/productActions';
import '../components/styles/sign-in.scss';
import { Product } from '../models/product';



type payloadTravel = {
    loading: boolean,
    success: boolean,
    error: string,
}

type productList = {
    products: Product[],
    loading : boolean,
    error : string
}

interface Rootstate {
    createTravel: payloadTravel;
    productList: productList;
}

const Travels = () => {

    const [name, setName]           = useState('');
    const [category, setCategory]   = useState('');
    const [price, setPrice]         = useState(0);
    const [stock, setStock]         = useState(0);
    const [image, setImage]         = useState('');
    

    const setNameInput      = (name : string)     => setName(name);
    const setCategoryInput  = (category : string) => setCategory(category);
    const setImageInput     = (image: string)     => setImage(image);
    const setPriceInput     = (price: number)     => setPrice(price); 
    const setStockInput     = (stock: number)     => setStock(stock);


    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createTravel({name, category, image, price, stock}))
    };

    const travaelSave = useSelector((state: Rootstate) => state.createTravel);
    const { loading: loadingCreate, success, error: errorCreate } = travaelSave;

    const productList = useSelector((state: Rootstate) => state.productList);
    const { loading, products, error } = productList; 

    const dispatch = useDispatch()

    useEffect(() => {        
        dispatch(listProducts());
    }, [dispatch])

    
    return (


            <div className="content content-margined">

                    <div className="travel-header">
                        <h3>Travels</h3>
                        <button>Create Travel</button>
                    </div>

                    <div className='form'>

                        <form onSubmit={submitHandler}>

                            <ul className="form-container">

                                <li>
                                    <h2>Add a new travel</h2>
                                </li>

                                <li>
                                    {loadingCreate && <div>Loading...</div>}
                                    {errorCreate && <div>{errorCreate}</div>}
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

                    <div className="travel-list">
                        <table>
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Category</td>
                                    <td>Price</td>
                                    <td>Stock</td>
                                    <td></td>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(product => (
                                    <tr>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
    )
}

export default Travels;