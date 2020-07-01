import React, { useState, useEffect } from "react";
import "../Css/Header.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Link,
  NavLink,
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useLocation,
  useHistory,
} from "react-router-dom";
import Auth from "../Services/Auth";
import { useSelector, useDispatch } from "react-redux";
const Header = (props) => {
  // const user = useSelector((state) => state.userReducer);
  // console.log('User from header',user);

  let location = useLocation();
  var LoginUser = null;
  const history = useHistory();
  const [route, setRoute] = useState(location.pathname);
  if (Auth.authenticated()) {
    var { firstName, lastName, id } = JSON.parse(
      localStorage.getItem("react-user")
    );

    LoginUser = "Welcome ," + firstName + " " + lastName;
  }
  useEffect(() => {
    setRoute(location.pathname);
  }, []);

  console.log("location.pathname", location.pathname);

  const selectedLink = (e, route) => {
    setRoute(route);
  };

  const logout = (e) => {
    localStorage.removeItem("react-token");
    localStorage.removeItem("react-user");
    history.push("/");
  };
  return (
    <React.Fragment>
      <div className="header pt-4 mb-5">
        <div className="row">
          <div className="col-md-4">
            <span className="ml-1">
              {/* {Auth.authenticated() && ( */}
              <Link
                exact
                to="/"
                className={`mr-2 ${route == "/" ? "active" : ""}`}
                onClick={(e) => selectedLink(e, "/")}
              >
                Home
              </Link>
              {/* )} */}
            </span>
            &nbsp;&nbsp;
            <span>
              {Auth.authenticated() && (
                <Link
                  exact
                  to={`/my-booking/${id}`}
                  className={`mr-2 ${route == "/my-booking" ? "active" : ""}`}
                  onClick={(e) => selectedLink(e, "/my-booking")}
                >
                  My Bookings
                </Link>
              )}
            </span>
          </div>
          <div className="col-md-4 text-center">
            <h3>Book Your Flight</h3>
          </div>
          <div className="col-md-4 text-right">
            <div className="pr-5">
              <span className="mr-3">{Auth.authenticated() && LoginUser}</span>
              {!Auth.authenticated() && (
                <NavLink
                  exact
                  to="/login"
                  className={`mr-2 ${route == "/login" ? "active" : ""}`}
                  onClick={(e) => selectedLink(e, "/login")}
                >
                  Login
                </NavLink>
              )}
              {!Auth.authenticated() && <span>/</span>}

              {!Auth.authenticated() && (
                <NavLink
                  exact
                  to="/sign-up"
                  className={`ml-2 ${route == "/sign-up" ? "active" : ""}`}
                  onClick={(e) => selectedLink(e, "/sign-up")}
                >
                  Sign Up
                </NavLink>
              )}

              {Auth.authenticated() && (
                <a href="#" type="button" onClick={(e) => logout(e)}>
                  Logout
                </a>
                // <NavLink exact to="/sign-up" className="ml-2">logout</NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
