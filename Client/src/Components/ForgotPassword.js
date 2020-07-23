import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { forgotPassword } from "../Services/PreloginApi";
import { loading, popup,alert } from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

const ForgotPassword = (props) => {
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();
  const popupState = useSelector((state) => state.popupReducer);
  const [data, setData] = useState({
    emailId: "",
  });

  useEffect(() => {
    // handleClickOpen();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    let popupData = {
      forgotPassword: false,
    };
    dispatch(popup(popupData));
  };

  const onInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 400);

    if (data.emailId != "") {
      dispatch(loading(true));
      forgotPassword(data)
        .then((result) => {
          let apiResponce = result.data;
          if (apiResponce.isSuccess) {
            handleClose();
            setData({
              emailId: "",
            });
            setProgress(0);
            dispatch(alert({
              status : true,
              severity : "success",
              message : "Email sent successfully,please check your email..."
            }))
          }
          clearInterval(timer);
          dispatch(loading(false));
        })
        .catch((error) => {
          dispatch(alert({
            status : true,
            severity : "error",
            message : "Email ID is not registered..."
          }))
          setProgress(0);
          clearInterval(timer);
          dispatch(loading(false));
          console.log("Error in forgot password", error);
        });
    }
  };
  return (
    <>
      <div>
        <form autoComplete="off" onSubmit={submitHandler}>
          <Dialog
            open={popupState.forgotPassword}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Forgot Password</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your email ID to get reset password password link
              </DialogContentText>
              <center>
                <CircularProgress variant="static" value={progress} color="secondary" className="loading" />
              </center>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                onChange={onInputChange}
                name="emailId"
                value={data.emailId}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={submitHandler}
                variant="contained"
                color="secondary"
              >
                Send
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
