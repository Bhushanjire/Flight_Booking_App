import React, { Component } from "react";
import loader from "../assets/images/loader.gif";
class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        {/* <center>{props?.isLoading && <img src={loader}></img>}</center> */}
      </React.Fragment>
    );
  }
}

export default Loading;
