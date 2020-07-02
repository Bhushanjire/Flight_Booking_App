import React from "react";
import Layout from "./Components/Layout";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import NotFound from "./Components/NotFound";
import Booking from "./Components/Booking";
import MyBooking from "./Components/MyBooking";
import Header from './Components/Header';
import ViewBooking from './Components/ViewBooking';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Layout} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/booking/:id/:noOfPerson/:mode" component={Booking} />
        <Route exact path="/my-booking/:id" component={MyBooking} />
        <Route exact path="/view-booking/:id" component={ViewBooking} />

        <Route component={NotFound} />
      </Switch>
      </React.Fragment>
  );
}

export default App;
