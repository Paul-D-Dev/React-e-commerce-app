import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles/sign-in.scss';


const SignIn = () => {

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
        console.log(email);
        console.log(password);
    };
    
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])

    
    return (
        <div className='form'>

            <form onSubmit={submitHandler}>

                <ul className="form-container">

                    <li>
                        <h2>Sign-In</h2>
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
                        <Link to='/register' className="button secondary text-center">Create your Dream Traval account</Link>
                    </li>
                </ul>

            </form>

        </div>
       
    )
}

export default SignIn;