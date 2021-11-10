import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from '../Dashboard/Dashboard';
import SignUp from '../SignUp/SignUp';
import LogIn from '../LogIn/LogIn';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute exact path="/" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;