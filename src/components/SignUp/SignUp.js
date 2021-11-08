import React, { useRef, useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Alert from '../Alert/Alert';
import { Link, useHistory } from "react-router-dom";

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
    <div>
      <form onSubmit={handleSubmit}>
        <img src="" alt="" width="72" height="57" />
        <h1>Sign Up Form</h1>
        {/* true && expression always evaluates to expression */}
        {error && <Alert text={error} variant='danger' />}
        <div>
          <input ref={emailInputEl} required type="email" id="emailInput" placeholder="name@example.com" />
          <label htmlFor="emailInput">Email address</label>
        </div>
        <div>
          <input ref={passwordInputEl} required type="password" id="passwordInput" placeholder="Password" />
          <label htmlFor="passwordInput">Password</label>
        </div>
        <button disabled={loading} type="submit">Sign up</button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  )
}

export default SignUp;
