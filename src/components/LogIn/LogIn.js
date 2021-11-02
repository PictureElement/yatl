import React, { useRef, useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Alert from '../Alert/Alert';
import { Link, useHistory } from "react-router-dom";

function LogIn() {
  // By default we are loading. As soon as the we get the "user" (onAuthStateChanged) we set loading to false
  const [loading, setLoading] = useState(true);

  // Currently logged in user
  const [loggedUser, setLoggedUser] = useState({});

  // Error
  const [error, setError] = useState('');

  // Form inputs
  const emailInputEl = useRef();
  const passwordInputEl = useRef();

  // The useHistory hook gives you access to the history instance that you may use to navigate.
  let history = useHistory();

  // Get the currently signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setLoggedUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    // Detach listener when the component unmounts
    return () => unsubscribe();
  }, []); // [] Only run once

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
        const user = userCredential.user;
        console.log(user);
        // Navigate to dashboard
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
      {/* Render form if loading is false */}
      {!loading && 
        <div>
          <form onSubmit={handleSubmit}>
            <img src="" alt="" width="72" height="57" />
            <p>Logged in as: {loggedUser.email ? loggedUser.email : 'N/A'}</p>
            <h1>Log In Form</h1>
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
            <button disabled={loading} type="submit">Log in</button>
          </form>
          <p>Don't have an account yet? <Link to="/signup">Sign up</Link></p>
        </div>
      }
    </div>
  );
}

export default LogIn;
