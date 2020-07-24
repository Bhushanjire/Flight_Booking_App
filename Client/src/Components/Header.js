import React, { useState, useEffect } from "react";
// import "../Css/Header.css";
import "../Css/Header.scss";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import Auth from "../Services/Auth";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Tooltip from "@material-ui/core/Tooltip";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const Header = (props) => {
  const classes = useStyles();
  // const user = useSelector((state) => state.userReducer);
  // console.log('User from header',user);

  let location = useLocation();
  var LoginUser = null;
  const history = useHistory();
  const [route, setRoute] = useState(location.pathname);
  if (Auth.authenticated()) {
    var { firstName, lastName, _id } = JSON.parse(
      localStorage.getItem("react-user")
    );

    LoginUser = "Welcome ," + firstName + " " + lastName;
  }
  useEffect(() => {
    setRoute(location.pathname);
  }, []);

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
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <span className="ml-1">
                {/* {Auth.authenticated() && ( */}
                <Link
                  to="/"
                  className={`mr-2 ${route == "/" ? "active" : ""}`}
                  onClick={(e) => selectedLink(e, "/")}
                >
                  <Button style={{ color: "white" }}>Home</Button>
                </Link>
                {/* )} */}
              </span>
              &nbsp;&nbsp;
              <span>
                {Auth.authenticated() && (
                  <>
                  <Link
                    to={`/my-booking/${_id}`}
                    className={`mr-2 ${route == "/my-booking" ? "active" : ""}`}
                    onClick={(e) => selectedLink(e, "/my-booking")}
                  >
                    <Button style={{ color: "white" }}>My Bookings</Button>
                  </Link> &nbsp;
                  <Link
                    to={`/profile/${_id}`}
                    className={`mr-2 ${route == "/profile" ? "active" : ""}`}
                    onClick={(e) => selectedLink(e, "/profile")}
                  >
                    <Button style={{ color: "white" }}>My Profile</Button>
                  </Link>
                  </>
                )}
              </span>
            </Typography>
            <div style={{ marginRight: "22%" }}>
              <h3>
                <FontAwesomeIcon icon={faPlane} className="plane-color" /> Book
                Your Flight{" "}
                <FontAwesomeIcon icon={faPlane} className="plane-color" />
              </h3>
            </div>
            <span className="mr-3">{Auth.authenticated() && LoginUser}</span>
            {!Auth.authenticated() && (
              <NavLink
                to="/login"
                className={`mr-2 ${route == "/login" ? "active" : ""}`}
                onClick={(e) => selectedLink(e, "/login")}
              >
                <Button style={{ color: "white" }}>Sign In</Button>
              </NavLink>
            )}
            {!Auth.authenticated() && <span>/</span>}

            {!Auth.authenticated() && (
              <NavLink
                to="/sign-up"
                className={`ml-2 ${route == "/sign-up" ? "active" : ""}`}
                onClick={(e) => selectedLink(e, "/sign-up")}
              >
                <Button style={{ color: "white" }}>Sign Up</Button>
              </NavLink>
            )}

            {Auth.authenticated() && (
              // <a href="#" type="button" onClick={(e) => logout(e)}>
              //   Logout
              // </a>

              <Tooltip title="Logout">
                <ExitToAppIcon onClick={(e) => logout(e)} className="logout-icon"/>
              </Tooltip>
              // <FontAwesomeIcon
              //   icon={faSignOutAlt}
              //   onClick={(e) => logout(e)}
              //   className="logout-icon"
              // />
            )}
          </Toolbar>
        </AppBar>
      </div>
      <div className="mb-5"></div>
    </React.Fragment>
  );
};

export default Header;
