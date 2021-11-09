import React, { useRef, useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Alert from '../Alert/Alert';
import { Link, useHistory } from "react-router-dom";
import logo from '../../assets/logo.svg';

function SignUp() {
  // By default we are not loading.
  const [loading, setLoading] = useState(false);

  // Error
  const [error, setError] = useState('');

  // Form inputs
  const emailInputEl = useRef();
  const passwordInputEl = useRef();

  // The useHistory hook gives you access to the history instance that you may use to navigate.
  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    // Start loading (disable Sign up button)
    setLoading(true);
    // No error at the moment
    setError('');

    // Sign up
    createUserWithEmailAndPassword(auth, emailInputEl.current.value, passwordInputEl.current.value)
      .then((userCredential) => {
        // Signed in 
        history.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Set error message
        setError(`${errorCode}: ${errorMessage}`);
        // Stop loading
        setLoading(false);
      });
  }

  return (
    <div className="form-user">
      <form onSubmit={handleSubmit}>
        <img className="form-user__brand" src={logo} alt="YATL logo" width="100" height="100" />
        <h1 className="form-user__title h5">Sign up</h1>
        <p className="form-user__subtitle">Create your YATL account</p>
        {/* true && expression always evaluates to expression */}
        {error && <Alert text={error} variant='danger' />}
        <div>
          <label className="visually-hidden" htmlFor="emailInput">Email address</label>
          <input className="form-user__input" ref={emailInputEl} required type="email" id="emailInput" placeholder="name@example.com" />
        </div>
        <div>
          <label className="visually-hidden" htmlFor="passwordInput">Password</label>
          <input className="form-user__input" ref={passwordInputEl} required type="password" id="passwordInput" placeholder="Password" />
        </div>
        <button className="form-user__submit" disabled={loading} type="submit">Sign up</button>
      </form>
      <p>Already have an account? <Link className="form-user__link" to="/login">Log in</Link></p>
    </div>
  )
}

export default SignUp;
