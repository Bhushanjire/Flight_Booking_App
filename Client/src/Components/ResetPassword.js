import React, { useState } from "react";
import { useParams,useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { resetPassword } from "../Services/PreloginApi";
import { loading } from "../Redux/Actions";
import { useDispatch } from "react-redux";




const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const ResetPassword = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const history = useHistory();
  let { emailId } = useParams();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
    emailId: emailId,
  });

  const onInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const resetPasswordHandler = (event) => {
    event.preventDefault();
    dispatch(loading(true));

    resetPassword(data)
      .then((result) => {
        let apiResponce = result.data;
        if (apiResponce.isSuccess) {
            history.push('/login');
        }
        dispatch(loading(false));

      })
      .catch((error) => {
        dispatch(loading(false));

        console.log("Error in reset password", error);
      });
    console.log("Form data", data);
  };

  return (
    <>
      <h1></h1>
      <form autoComplete="off" onSubmit={resetPasswordHandler}>
        <div className="row mb-1">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Card className={classes.root}>
              <CardContent>
                <div className="row mb-2">
                  <div className="col-md-12 text-center">
                    Reset Password for <strong>{emailId}</strong>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <TextField
                      id="newPassword"
                      label="New Password"
                      placeholder="Enter new password"
                      name="newPassword"
                      fullWidth
                      required
                      value={data.newPassword}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <TextField
                      id="confirmPassword"
                      label="Confirm Password"
                      placeholder="Enter confirm password"
                      name="confirmPassword"
                      style={{ width: "100%" }}
                      required
                      value={data.confirmPassword}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardActions>
                <Button type="submit" variant="contained" color="secondary">
                  Reset Password
                </Button>
              </CardActions>
            </Card>
          </div>
          <div className="col-md-4"></div>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
