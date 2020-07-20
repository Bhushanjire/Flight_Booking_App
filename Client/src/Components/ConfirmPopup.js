import React, {Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class ConfirmPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isClose: false,
      heading: null,
      message: null,
    };
  }

  handleClose = (e, value) => {
    this.setState({
      isClose: true,
      isOpen: false,
    });
    return value;
  };
  handleShow = (data) => {
    this.setState({
      heading: data.heading,
      message: data.message,
    });
    this.setState({
      isOpen: true,
      isClose: true,
    });
  };

  render() {
    return (
      <>
        <Modal
          show={this.state.isOpen}
          onHide={this.handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">
              {this.state.heading}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.message}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(e) => this.props.close(e, false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={(e) => this.props.close(e, true)}
            >
              {this.state.heading}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ConfirmPopup;
