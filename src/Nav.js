import React, { useState, useEffect } from 'react';
import "./Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);

    const transitionNavBar = () =>{
        if (window.scrollY > 100){
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, [])
  return (
    <div className={`nav ${show && "nav__black"}`}>
        <div className="nav__contents">
            <img className='nav__logo'
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.techdaily.com.au%2Fb2%2Fwp-content%2Fuploads%2F2015%2F03%2FNetflix_Logo_Print_FourColorCMYK.png&f=1&nofb=1&ipt=501b671ac47edeacac5cafbb410cd9fd4bd1d11eda6ad9613a8efaca38190c4f&ipo=images" 
                alt=""/>
            <img className='nav__avatar'
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fnetflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg&f=1&nofb=1&ipt=9dfc05029fc2f44789b1112423dfb2297f30e69f737a055c42367216718f1b20&ipo=images" 
                alt=""/>
        </div>
    </div>
  )
}

export default Nav