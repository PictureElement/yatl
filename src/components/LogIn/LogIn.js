import React, { useRef, useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Alert from '../Alert/Alert';

function LogIn() {
  // Loading
  const [loading, setLoading] = useState(false);

  // Currently logged in user
  const [loggedUser, setLoggedUser] = useState({});

  // Error
  const [error, setError] = useState('');

  // Form inputs
  const emailInputEl = useRef();
  const passwordInputEl = useRef();

  // Get the currently signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedUser(user);
        // const uid = user.uid;
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
  );
}

export default LogIn;
