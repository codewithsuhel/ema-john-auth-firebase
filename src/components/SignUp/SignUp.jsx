import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProviders';

const SignUp = () => {

    const [error, setError] = useState('');
    const {createUser} = useContext(AuthContext);

    const handleSignUp = event =>{
        event.preventDefault()

        const form = event.target;
        // const name = event.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(name, email, password, confirm);
        setError('');
        
        if(password !== confirm){
            setError('Your password did not match')
            return;
        }
        else if(password.length < 6){
            setError('password must be a characters or longer');
            return
        }

        createUser(email, password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error=>{
            console.log(error);
            setError(error.message);
        })


    }


    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign up</h2>
            <form onSubmit={handleSignUp}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='' />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='' />
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name='confirm' id='' />
                </div>
                <input className='btn-submit' type="submit" value="Sign up" />
                <p><small>Already have an account? <Link to="/login">Login</Link> </small></p>
                <p className='text-error'>{error}</p>
            </form>
        </div>
    );
};

export default SignUp;