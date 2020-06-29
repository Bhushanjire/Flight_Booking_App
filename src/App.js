import React from "react";
import Layout from "./Components/Layout";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import NotFound from "./Components/NotFound";
import Booking from "./Components/Booking";
import MyBooking from "./Components/MyBooking";

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
        <Route exact path="/booking/:id/:noOfPerson" component={Booking} />
        <Route exact path="/my-booking" component={MyBooking} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
