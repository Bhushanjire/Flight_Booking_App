import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { alert } from '../Redux/Actions/';
import { AlertTitle } from '@material-ui/lab';



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertSuccess = () => {
  const alertState = useSelector((state) => state.alertReducer);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    let alertData = {
      status: false,
      severity: "",
      message: ""
    }
    dispatch(alert(alertData))
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {
        alertState.status && <Snackbar open={alertState.status} autoHideDuration={3000} onClose={handleClose} className="alert-message">
          <Alert onClose={handleClose} severity={alertState.severity}>
            <AlertTitle>{(alertState.severity).charAt(0).toUpperCase() + (alertState.severity).slice(1)}</AlertTitle>
            {alertState.message}
          </Alert>
        </Snackbar>
      }
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
};

export default AlertSuccess;
