import React from 'react'
import './ProfileScreen.css'
import Nav from '../Nav'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import PlansScreen from './PlansScreen'

function ProfileScreens() {
    const user = useSelector(selectUser)
  return (
    <div className='profileScreen'>
        <Nav />
        <div className="profileScreen__body">
            <h1>Edit Profile</h1>
            <div class="profileScreen__info">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fnetflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg&f=1&nofb=1&ipt=9dfc05029fc2f44789b1112423dfb2297f30e69f737a055c42367216718f1b20&ipo=images"  
                alt=""
            />
            <div className="profileScreen__details">
                <h2>{user.email}</h2>
                <div className="profileScreen__plans">
                    <h3>Plans</h3>
                    <PlansScreen />
                    <button 
                    onClick={() => auth.signOut()} 
                    className='profileScreen__signOut'>
                    Sign out
                    </button>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileScreens