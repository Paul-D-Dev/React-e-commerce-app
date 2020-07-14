import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTravel, deleteTravel, listProducts } from '../actions/productActions';
import '../components/styles/sign-in.scss';
import { Product } from '../models/product';
import './styles/travels.scss';



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
    deleteTravel: payloadTravel;
    productList: productList;
}

const Travels = () => {

    const [_id, setId]               = useState('');
    const [name, setName]           = useState('');
    const [category, setCategory]   = useState('');
    const [price, setPrice]         = useState(0);
    const [stock, setStock]         = useState(0);
    const [image, setImage]         = useState('');
    const [modal, setModal]         = useState(false);
    

    const setNameInput      = (name : string)     => setName(name);
    const setCategoryInput  = (category : string) => setCategory(category);
    const setImageInput     = (image: string)     => setImage(image);
    const setPriceInput     = (price: number)     => setPrice(price); 
    const setStockInput     = (stock: number)     => setStock(stock);


    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createTravel({_id, name, category, image, price, stock}))
    };

    const openModal = (travel?: Product) => {
        setModal(!modal);
        if(travel && travel._id) {
            setId(travel._id);
            setNameInput(travel.name);
            setCategoryInput(travel.category);
            setImageInput(travel.image);
            setPriceInput(travel.price);
            setStockInput(travel.stock);
        } else {
            setId('');
            setNameInput('');
            setCategoryInput('');
            setImageInput('');
            setPriceInput(0);
            setStockInput(0);
        }
    }

    const deleteHandler = (travel: Product) => {
        if (travel._id) {
            dispatch(deleteTravel(travel._id));
        }
    }

    const travelSave = useSelector((state: Rootstate) => state.createTravel);
    const { loading: loadingCreate, success: successCreate, error: errorCreate } = travelSave;

    const travelDelete = useSelector((state: Rootstate) => state.deleteTravel); 
    const { success: successDelete } = travelDelete;

    const productList = useSelector((state: Rootstate) => state.productList);
    const { products} = productList; 

    const dispatch = useDispatch()

    useEffect(() => {    
        if(successCreate) {
            setModal(false);
        } 
        dispatch(listProducts());
    }, [dispatch, successCreate, successDelete])

    

    return (


            <div className="content content-margined">

                    <div className="travel-header">
                        <h3>Travels</h3>
                        <button className="button primary" onClick={() => openModal()}>Create Travel</button>
                    </div>

                    {
                        modal && 
                            <div className='form'>

                            <form onSubmit={submitHandler}>

                                <ul className="form-container">

                                    <li>
                                        <h2>
                                            {_id ? 'Update Travel' : 'Add a new travel'}
                                        </h2>
                                    </li>

                                    <li>
                                        {loadingCreate && <div>Loading...</div>}
                                        {errorCreate && <div>{errorCreate}</div>}
                                        {successCreate && <div>{_id ? "Travel updating" : "Travel adding"}</div>}
                                    </li>

                                    <li>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" value={name} onChange={(e) => setNameInput(e.target.value)}/>
                                    </li>

                                    <li>
                                        <label htmlFor="category">Category</label>
                                        <input type="text" id="category" value={category} onChange={(e) => setCategoryInput(e.target.value)}/>
                                    </li>

                                    <li>
                                        <label htmlFor="image">Image</label>
                                        <input type="text" name="image" id="image" value={image} onChange={(e) => setImageInput(e.target.value)}/>
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
                                        <button type="submit" className="button primary">{_id ? 'UPDATE' : 'ADD'}</button>
                                    </li>
                                    
                                    <li>
                                        <button type="submit" className="button secondary" onClick={ () => setModal(false)}>BACK</button>
                                    </li>

                                </ul>

                            </form>

                        </div>
                    }
                    

                    <div className="travel-list">
                        <table className="width100">
                            <thead className="text-center">
                                <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Category</td>
                                    <td>Price</td>
                                    <td>Stock</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>

                            <tbody className="tbody text-center">
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td>{product.stock}</td>
                                        <td className="btn-actions">
                                            <button className="button" onClick={() => openModal(product)}>Edit</button>
                                            <button className="button" onClick={() => deleteHandler(product)}>Delete</button>
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