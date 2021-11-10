import React, { useRef, useState, useEffect } from 'react';
import { auth } from '../api/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import logo from '../assets/logo.svg';
import validate from '../utils/validate';

function LogIn() {
  // By default we are not loading
  const [loading, setLoading] = useState(false);

  // Input values
  const [inputValues, setInputValues] = useState({
    email: '',
    password: ''
  });

  // Customized error messages
  const [inputErrors, setInputErrors] = useState({
    email: '',
    password: ''
  });

  // Server error
  const [serverError, setServerError] = useState('');

  // Form inputs
  const emailInputEl = useRef();
  const passwordInputEl = useRef();

  // The useHistory hook gives you access to the history instance that you may use to navigate.
  let history = useHistory();

  const handleChange = (e) => {
    // Object destructuring
    const {name, value} = e.target;

    // Overwrite value for "name" property
    setInputValues({...inputValues, [name]: value});
  };

  // Login component is always in light mode. Runs on first render only.
  useEffect(() => {
    document.documentElement.classList.remove('theme-dark');
  }, []);

  useEffect(() => {
    // If there are no errors, initiate communication with Firebase
    if (Object.keys(inputErrors).length === 0) {

      // Start loading (disable Log in button)
      setLoading(true);

      // No server error at the moment
      setServerError('');
      
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
          setServerError(errorMessage);
          // Stop loading
          setLoading(false);
        });
    }
  }, [inputErrors, history]); // Only re-run the effect if "inputErrors" changes

  function handleSubmit(e) {
    // Cancel default action on form submission
    e.preventDefault();

    // Set input errors.
    // useEffect is then triggered.
    setInputErrors(validate(inputValues));
  }

  return (
    <div>
      <div className="form-user">
        <form noValidate onSubmit={handleSubmit}>
          <img className="form-user__brand" src={logo} alt="YATL logo" width="100" height="100" />
          <h1 className="form-user__title h5">Log in</h1>
          <p className="form-user__subtitle">Use your YATL account</p>
          <div className="mb-4">
            <label className="visually-hidden" htmlFor="email">Email address</label>
            <input value={inputValues.email} onChange={handleChange} className="form-user__input" ref={emailInputEl} type="email" name="email" id="email" placeholder="name@example.com" />
            {inputErrors.email && <div className="form-user__feedback">{inputErrors.email}</div>}
          </div>
          <div className="mb-4">
            <label className="visually-hidden" htmlFor="password">Password</label>
            <input value={inputValues.password} onChange={handleChange} className="form-user__input" ref={passwordInputEl} type="password" name="password" id="password" placeholder="Password" />
            {inputErrors.password && <div className="form-user__feedback">{inputErrors.password}</div>}
          </div>
          <button className="form-user__submit" disabled={loading} type="submit">Log in</button>
        </form>
        <p>Don't have an account yet? <Link className="form-user__link" to="/signup">Sign up</Link></p>
      </div>
      {serverError && <Snackbar open={true} autoHideDuration={4000} onClose={() => setServerError('')} message={serverError} />}
    </div>
  );
}

export default LogIn;
