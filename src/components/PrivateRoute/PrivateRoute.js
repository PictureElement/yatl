// This is a wrapper for <Route> components

import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { Route, Redirect } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function PrivateRoute({ component: Component, ...theProps }) {
  // By default we are loading. As soon as the we get the "user" (onAuthStateChanged) we set loading to false
  const [loading, setLoading] = useState(true);
  // Currently logged in user
  const [loggedUser, setLoggedUser] = useState(null);
  
  // Get the currently signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedUser(user);
      setLoading(false);
    });
    // Detach listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {!loading
        ? (loggedUser === null)
            ? <Route {...theProps} render={() => <Redirect to="/login" />} />
            : <Route {...theProps} render={() => <Component />} />
        : (null)
      }
    </div>
  );
}

export default PrivateRoute;
