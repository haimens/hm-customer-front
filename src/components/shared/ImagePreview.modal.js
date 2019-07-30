import React, { Component } from "react";
import Modal from "./Modal";

/**
 * @image
 */
export default class ImagePreview extends Component {
  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
  };
  render() {
    return (
      <Modal
        title="Image Preview"
        zIndex="2000"
        position={"center"}
        getWidth={"600px"}
        getHeight={"600px"}
        onClose={this.handleClose}
      >
        <section className="d-flex justify-content-center align-items-center">
          <img src={this.props.image} alt="alt" width="100%" />
        </section>
      </Modal>
    );
  }
}
