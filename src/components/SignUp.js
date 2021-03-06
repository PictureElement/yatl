import React, { useRef, useState, useEffect } from 'react';
import { auth } from '../api/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import logo from '../assets/logo.svg';
import validate from '../utils/validate';

function SignUp() {
  // By default we are not loading.
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

  useEffect(() => {
    // If there are no errors, initiate communication with Firebase
    if (Object.keys(inputErrors).length === 0) {
      // Start loading (disable Sign up button)
      setLoading(true);
      // No error at the moment
      setServerError('');

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
          setServerError(`${errorCode}: ${errorMessage}`);
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
          <h1 className="form-user__title h5">Sign up</h1>
          <p className="form-user__subtitle">Create your YATL account</p>
          <div className="mb-4">
            <label className="visually-hidden" htmlFor="email">Email address</label>
            <input autoFocus value={inputValues.email} onChange={handleChange} className="form-user__input" ref={emailInputEl} type="email" name="email" id="email" placeholder="name@example.com" />
            {inputErrors.email && <div className="form-user__feedback">{inputErrors.email}</div>}
          </div>
          <div className="mb-4">
            <label className="visually-hidden" htmlFor="password">Password</label>
            <input value={inputValues.password} onChange={handleChange} className="form-user__input" ref={passwordInputEl} required type="password" name="password" id="password" placeholder="Password" />
            {inputErrors.password && <div className="form-user__feedback">{inputErrors.password}</div>}
          </div>
          <button className="form-user__submit" disabled={loading} type="submit">Sign up</button>
        </form>
        <p>Already have an account? <Link className="form-user__link" to="/login">Log in</Link></p>
      </div>
      {serverError && <Snackbar open={true} autoHideDuration={4000} onClose={() => setServerError('')} message={serverError} />}
    </div>
  )
}

export default SignUp;
