import React, { useEffect, useState, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, RouteComponentProps } from 'react-router-dom';
import { signin } from '../actions/userActions';
import './styles/sign-in.scss';
import { User } from '../models/user';


type payloadUser = {
    loading: boolean,
    // Same userInfos from store redux
    userInfos: User,
    error: string,
}

interface Rootstate {
    userSignin: payloadUser;
}

const SignIn: FunctionComponent<RouteComponentProps> = ({location}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setEmailForm = (email : string) => {
        setEmail(email);
    };

    const setPasswordForm = (password: string) => {
        setPassword(password);
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signin(email, password))
    };

    // Get the user from the store.userSignin
    const userSignin = useSelector((state: Rootstate) => state.userSignin)
    // desctructure the object userSignin.
    const { loading, userInfos, error } = userSignin;

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
                        <h2>Sign-In</h2>
                    </li>

                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                        {userInfos && <div>{userInfos.name}</div>}
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
                        <button type="submit" className="button primary">Sign in</button>
                    </li>

                    <li>
                        New to Dream Travel ?
                    </li>

                    <li>
                        <Link to={redirect === '/' ? "/register" : "/register?redirect=" + redirect} className="button secondary text-center">Create your Dream Traval account</Link>
                    </li>
                </ul>

            </form>

        </div>
       
    )
}

export default SignIn;