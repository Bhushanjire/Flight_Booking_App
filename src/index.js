import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";
import Header from "./includes/header";

const rootReducer = combineReducers({
  form: formReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <React.Fragment>
    <Header/>
    <App />
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();