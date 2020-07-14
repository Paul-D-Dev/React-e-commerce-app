import React, { useEffect, useState, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, RouteComponentProps } from 'react-router-dom';
import './styles/sign-in.scss';
import { User } from '../models/user';
import { register } from '../actions/userActions';


type payloadUser = {
    loading: boolean,
    // Same userInfos from store redux
    userInfos: User,
    error: string,
}

interface Rootstate {
    userRegister: payloadUser;
}

const Register: FunctionComponent<RouteComponentProps> = ({location}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setNameForm = (name : string) => {
        setName(name);
    };

    const setEmailForm = (email : string) => {
        setEmail(email);
    };

    const setPasswordForm = (password: string) => {
        setPassword(password);
    };


    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register(name, email, password))
    };

    // Get the user from the store.userSignin
    const userRegister = useSelector((state: Rootstate) => state.userRegister)
    // desctructure the object userSignin.
    const { loading, userInfos, error } = userRegister;

    const dispatch = useDispatch()
    const history = useHistory();
    const redirect = location.search ? location.search.split("=")[1] : '/';


    useEffect(() => {        
        if(userInfos) {
            history.push(redirect)
        }
    }, [history, redirect, userInfos])

    
    return (
        <div className='form'>

            <form onSubmit={submitHandler}>

                <ul className="form-container">

                    <li>
                        <h2>Create an account</h2>
                    </li>

                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>

                    <li>
                        <label htmlFor="name">Name</label>
                        <input type="name" id="name" onChange={(e) => setNameForm(e.target.value)}/>
                    </li>

                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={(e) => setEmailForm(e.target.value)}/>
                    </li>

                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPasswordForm(e.target.value)}/>
                    </li>

                    <li>
                        <button type="submit" className="button primary">Sign-Up</button>
                    </li>

                    <li>
                        Already have an account ?                         
                        <Link to={redirect === '/' ? "/signin" : "/register?redirect=" + redirect} className="button secondary text-center">Sign-In</Link>
                    </li>

                </ul>

            </form>

        </div>
       
    )
}

export default Register;