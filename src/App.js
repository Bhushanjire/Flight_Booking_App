import React from "react";
import Layout from "./includes/Layout";
import Login from "./Conponents/Login";
import SignIn from "./Conponents/SignIn";
import NotFound from "./Conponents/NotFound";
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
        <Route exact path="/sign-in" component={SignIn} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
