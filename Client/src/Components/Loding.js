import React from "react";
import loader from "../assets/images/loader.gif";
import { useSelector } from "react-redux";

const Loading = () => {
  const loadingState = useSelector((state) => state.loadingReducer);
  return (
    <React.Fragment>
      {loadingState && <center>{<img src={loader} className="loading"></img>}</center>}
    </React.Fragment>
  );
};

export default Loading;
