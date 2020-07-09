import React, { Component } from "react";
// import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { connect } from "react-redux";
import { filter } from "../Redux/Actions/index";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Divider from '@material-ui/core/Divider';

class Filter extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      price: 1500,
      company: [],
      inputCheck: false,
    };
  }

  submitHandler = (e) => {
    this.props.filter(this.state);
    console.log("Button click", e);
  };

  handleOnChange = (e,value) => {
    console.log('Range value',value);
    this.setState({
      price: value,
    });
  };

  inputChange = (e) => {
    console.log(e.target.value);
    if (e.target.checked) {
      this.setState({
        company: e.target.value,
      });
    } else {
      this.setState({
        company: "",
      });
    }
    // this.setState({
    //   inputChange: e.target.checked,
    // });
  };

  resetFilter = (e) => {
    this.setState({
      price: 1500,
      company: [],
    });
    this.props.filter(this.state);
  };

  render() {
    return (
      <>
        <div className="row mb-2">
          <div className="col-md-12 ft-w-600">
            Price :
            <div>
              {/* <Slider
                value={this.state.price}
                orientation="vertical"
                onChange={this.handleOnChange}
                orientation="horizontal"
                min={1000}
                max={10000}
                step={500}
              /> */}

              {/* <Typography id="range-slider" gutterBottom>
                Temperature range
              </Typography> */}
              <Slider
                value={this.state.price}
                onChange={this.handleOnChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                // getAriaValueText={valuetext}
                min={1000}
                step={500}
                max={10000}
              />
            </div>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-12">
          <Divider />
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
                <Checkbox
                  onChange={(e) => this.inputChange(e)}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  value={this.state.company}
                />
                &nbsp; Indigo AirLine
              </li>
              <li>
                <Checkbox
                  onChange={(e) => this.inputChange(e)}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  value="Kingfisher Airline"
                />
                &nbsp; Kingfisher Airline
              </li>
            </ul>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-12">
          <Divider />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-12 text-center">
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={(e) => this.submitHandler(e)}
            >
              Apply
            </Button>
            &nbsp;
            <Button
              type="button"
              onClick={(e) => this.resetFilter(e)}
              variant="contained"
            >
              Reset
            </Button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, { filter })(Filter);

// export default Filter;
