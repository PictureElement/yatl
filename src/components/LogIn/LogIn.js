import React, { useRef, useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

function LogIn() {
  // Loading
  const [loading, setLoading] = useState(false);

  // Form inputs
  const emailInputEl = useRef();
  const passwordInputEl = useRef();

  function handleSubmit() {
    setLoading(true);
    
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
        console.error(`${errorCode}: ${errorMessage}`);
      });

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <img src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
      <h1>Log In</h1>
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
