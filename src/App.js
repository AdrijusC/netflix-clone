import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser, logout } from './features/userSlice';
import ProfileScreens from './screens/ProfileScreens';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User is authenticated
        dispatch(
          login({
            id: userAuth.uid, // Set the user's unique ID
            email: userAuth.email,
          })
        );
      } else {
        // User is logged out
        dispatch(logout());
      }
    });

    return unsubscribe; // Cleanup on unmount
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path='/profile' element ={<ProfileScreens />}/>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;

