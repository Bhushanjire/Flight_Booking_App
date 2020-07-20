import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { forgotPassword } from "../Services/PreloginApi";
import { loading } from "../Redux/Actions";
import { useDispatch } from "react-redux";


const ForgotPassword = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

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
  };

  const onInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (data.emailId != "") {
        dispatch(loading(true));
      forgotPassword(data)
        .then((result) => {
          let apiResponce = result.data;
          if (apiResponce.isSuccess) {
            console.log("Forgot Password", apiResponce);
            handleClose();
          }
          dispatch(loading(false));
        })
        .catch((error) => {
          dispatch(loading(false));
          console.log("Error in forgot password", error);
        });
    }
  };
  return (
    <>
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <form autoComplete="off" onSubmit={submitHandler}>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Forgot Password</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your email ID to get reset password password link
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                onChange={(e) => onInputChange(e)}
                name="emailId"
                value={data.emailId}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={submitHandler} color="primary">
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
