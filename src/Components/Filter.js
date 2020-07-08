import React, { Component } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { connect } from "react-redux";
import { filter } from "../Redux/Actions/index";

class Filter extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      price: 1500,
      company : 'xyz'
    };
  }

  submitHandler = (e) => {
    this.props.filter(this.state);
    console.log("Button click", e);
  };

  handleOnChange = (value) => {
    this.setState({
      price: value,
    });
  };

  inputChange = (e)=>{
    console.log(e.target.value);
  }

  resetFilter =(e)=>{
    this.state={}
    this.props.filter(this.state);

  }

  render() {
    return (
      <>
        <div className="row mb-2">
          <div className="col-md-12 ft-w-600">
            Price :
            <div>
              <Slider
                value={this.state.price}
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
                <input type="checkbox"  value={this.state.company} onChange={(e)=>this.inputChange(e)} /> &nbsp; Indigo AirLine
              </li>
              <li>
                <input type="checkbox" /> &nbsp; Kingfisher Airline
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
            <button
              type="button"
              onClick={(e) => this.submitHandler(e)}
              className="btn btn-primary"
            >
              Apply
            </button> &nbsp;
            <button
              type="button"
              onClick={(e) => this.resetFilter(e)}
              className="btn btn-warning"
            >
              Reset
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({  
   state
});  
  
export default connect(mapStateToProps, { filter })(Filter); 

// export default Filter;
