import React from 'react'
import './SignupScreen.css'
import { auth } from '../firebase';
import { useRef } from 'react';

function SignupScreen() {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) =>{
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((authUser) => {
            console.log(authUser)
        })
        .catch((error) => {
            alert(error.message)
        });
    };

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
        }).catch(error => alert (error.message));
    }

  return (
    <div className='signupScreen'>
        <form action="">
            <h1 className=''>Sign in</h1>
            <input ref={emailRef} placeholder='Email ' type="text"/>
            <input ref={passwordRef} placeholder='Password' type="text"/>
            <button type="submit" onClick={signIn}>Sign In</button>
            <h4 className=''><span className='signupScreen__gray'>
                NEW TO NETFLIX? </span> 
                <span className='signupScreen__link' onClick={register}>SIGN UP NOW.</span></h4>
        </form>
    </div>
  )
}

export default SignupScreen