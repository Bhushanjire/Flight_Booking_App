import React from "react";
import Layout from "./Components/Layout";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import NotFound from "./Components/NotFound";
import Booking from "./Components/Booking";
import MyBooking from "./Components/MyBooking";
import Header from "./Components/Header";
import ViewBooking from "./Components/ViewBooking";
import Loading from "./Components/Loding";
import Protected from "./Components/Protected";

import "./App.css";

import {
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Loading />
      <Switch>
        <Route exact path="/" component={Layout} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />

        <Protected
          exact
          path="/booking/:id/:noOfPerson/:mode"
          component={Booking}
        ></Protected>
        {/* <Route
          exact
          path="/booking/:id/:noOfPerson/:mode"
          component={Booking}
        /> */}
        <Protected
          exact
          path="/booking/:id/:noOfPerson/:mode"
          component={Booking}
        ></Protected>
        <Protected
          exact
          path="/my-booking/:id"
          component={MyBooking}
        ></Protected>
        {/* <Route exact path="/my-booking/:id" component={MyBooking} /> */}
        <Protected
          exact
          path="/view-booking/:id"
          component={ViewBooking}
        ></Protected>
        {/* <Route exact path="/view-booking/:id" component={ViewBooking} /> */}

        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
