import React, { Component } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { connect } from "react-redux";
import Main from "../Components/Main";
import { filter } from "../Redux/Actions/index";

class Filter extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      volume: 1500,
    };

   
  }
   mapDispatchToProps = (dispatch) => {
    return {
      filter: (value) => dispatch({ type: "FILTER", value: this.state }),
    };
  };

  handleOnChange = (value) => {
    this.setState({
      volume: value,
    });
  };
  render() {
    return (
      <>
        <div className="row mb-2">
          <div className="col-md-12 ft-w-600">
            Price :
            <div>
              <Slider
                value={this.state.volume}
                orientation="vertical"
                onChange={this.handleOnChange}
                orientation="horizontal"
                min={1000}
                max={10000}
                step={500}
              />
            </div>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-12">
            <hr />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-12 ft-w-600">Company </div>
          <div>
            <ul
              style={{
                listStyleType: "none",
              }}
            >
              <li>
                <input type="checkbox" /> &nbsp; Indigo AirLine{" "}
              </li>
              <li>
                <input type="checkbox" /> &nbsp; Kingfisher AirLine{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-12">
            <hr />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-12 text-center">
            <button type="button" className="btn btn-primary">
              Apply
            </button>
          </div>
        </div>
      </>
    );
  }
}
export default Filter;
// export default connect(null,this.mapDispatchToProps)(Filter)
