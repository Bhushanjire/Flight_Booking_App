import React from "react";
import Layout from "./includes/Layout";
import Login from "./Conponents/Login";
import SignUp from "./Conponents/SignUp";
import NotFound from "./Conponents/NotFound";
import Booking from "./Conponents/Booking";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Layout} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/booking/:id" component={Booking} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
