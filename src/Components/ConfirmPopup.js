import React, { useState, Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class ConfirmPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isClose: false,
    };
    console.log("props in ConfirmPopup", this.props);
  }

  handleClose = () => {
    console.log("handleClose called");
    this.setState({
      isClose: false,
    });
  };
  handleShow = () => {
    this.setState({
      isOpen: true,
    });
  };

  render() {
    return (
      <>
        <Modal
          show={this.state.isOpen}
          onHide={this.state.isClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.close}>
              Close
            </Button>
            <Button variant="primary" onClick={this.props.close}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ConfirmPopup;
