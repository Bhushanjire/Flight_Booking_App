import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import allReducers from "./Redux/Reducer/";
import { BrowserRouter as Router } from "react-router-dom";
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

const store = createStore(
  allReducers,
  applyMiddleware(thunk, logger)
);

ReactDOM.render(
  <React.Fragment>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
