import React, { useState } from 'react'
import './LoginScreen.css'
import SignupScreen from './SignupScreen';

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);

  return (
    <div className="loginScreen">
        <div className="loginScreen__background">
            <img className="loginScreen_logo"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.techdaily.com.au%2Fb2%2Fwp-content%2Fuploads%2F2015%2F03%2FNetflix_Logo_Print_FourColorCMYK.png&f=1&nofb=1&ipt=501b671ac47edeacac5cafbb410cd9fd4bd1d11eda6ad9613a8efaca38190c4f&ipo=images"
            alt=""
            />
            <button onClick={() => setSignIn(true)} 
            className='loginScreen__button'>
                Sign in
            </button>

            <div className="loginScreen_gradient"/>

        </div>
        <div className="loginScreen__body">
            {signIn ? (
                <SignupScreen />
            ) : (
                <>
                <h1>UNLIMITED FILMS, TV PROGRAMMES AND MORE.</h1>
                <h2>WATCH ANYWHERE. CANCEL AT ANY TIME</h2>
                <h3>READY TO WATCH? ENTER YOUR EMAIL TO CREATE OR RESTART YOUR MEMBERSHIP.</h3>
            <div className="loginScreen__input">
                <form action="">
                    <input 
                        type="email" 
                        placeholder='Email Address'
                    />
                    <button
                    onClick={() => setSignIn(true)} 
                    className="loginScreen__getStarted">
                        Get Started
                    </button>
                </form>
            </div>
            </>
            )}
        </div>
    </div>
  )
}

export default LoginScreen;