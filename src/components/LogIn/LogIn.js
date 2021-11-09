import React, { useRef, useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
// import Alert from '../Alert/Alert';
import { Link, useHistory } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import './Login.scss'
import logo from '../../assets/logo.svg';

function LogIn() {
  // By default we are not loading
  const [loading, setLoading] = useState(false);

  // Error
  const [error, setError] = useState('');

  // Form inputs
  const emailInputEl = useRef();
  const passwordInputEl = useRef();

  // The useHistory hook gives you access to the history instance that you may use to navigate.
  let history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(false);
  };

  function handleSubmit(e) {
    e.preventDefault();

    // Start loading (disable Log in button)
    setLoading(true);
    // No error at the moment
    setError('');
    
    // Log in
    signInWithEmailAndPassword(auth, emailInputEl.current.value, passwordInputEl.current.value)
      .then((userCredential) => {
        // Signed in 
        // Navigate to dashboard
        history.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage;
        
        switch (errorCode) {
          case 'auth/user-not-found':
            errorMessage = "Couldn't find your YATL account.";
            break;
          case 'auth/wrong-password':
            errorMessage = 'Wrong password. Try again.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed login attempts. Try again later.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Your YATL account is disabled.';
            break;
          default:
            errorMessage = 'Sorry, something went wrong. Try again.';
        }

        // Set error message
        setError(`${errorMessage}`);
        // Stop loading
        setLoading(false);
      });
  }

  return (
    <div>
      <div className="form-user">
        <form onSubmit={handleSubmit}>
          <img className="form-user__brand" src={logo} alt="YATL logo" width="100" height="100" />
          <h1 className="form-user__title h5">Log in</h1>
          <p className="form-user__subtitle">Use your YATL account</p>
          <div>
            <label className="visually-hidden" htmlFor="emailInput">Email address</label>
            <input className="form-user__input" ref={emailInputEl} required type="email" id="emailInput" placeholder="name@example.com" />
          </div>
          <div>
            <label className="visually-hidden" htmlFor="passwordInput">Password</label>
            <input className="form-user__input" ref={passwordInputEl} required type="password" id="passwordInput" placeholder="Password" />
          </div>
          <button className="form-user__submit" disabled={loading} type="submit">Log in</button>
        </form>
        <p>Don't have an account yet? <Link className="form-user__link" to="/signup">Sign up</Link></p>
      </div>
      <Snackbar open={error} autoHideDuration={4000} onClose={handleClose} message={error} />
    </div>
  );
}

export default LogIn;
