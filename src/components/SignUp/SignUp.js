import React, { useRef, useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import Alert from '../Alert/Alert';

function SignUp() {
  // Loading state for disabling the Sign up button
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
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    // Start loading
    setLoading(true);
    // No error
    setError('');

    // Sign up
    createUserWithEmailAndPassword(auth, emailInputEl.current.value, passwordInputEl.current.value)
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
      <h1>Logged in as: {loggedUser.email ? loggedUser.email : 'N/A'}</h1>
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
  )
}

export default SignUp;
