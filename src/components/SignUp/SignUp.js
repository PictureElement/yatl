import React, { useRef, useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  // Loading
  const [loading, setLoading] = useState(false);

  // Currently logged in user
  const [loggedUser, setLoggedUser] = useState({});

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

    setLoading(true);

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
        console.error(`${errorCode}: ${errorMessage}`);
        setLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <img src="" alt="" width="72" height="57" />
      <h1>Logged in as: {loggedUser.email ? loggedUser.email : 'N/A'}</h1>
      <h1>Sign Up Form</h1>
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

export default SignUp
