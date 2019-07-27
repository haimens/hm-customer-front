import React, { Component } from "react";
import { Modal } from "../shared";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";

/**
 * ImageLoaderModal
 * @title
 * @onClose
 * @onImageUpload
 */
export default class ImageLoaderModal extends Component {
  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
  };

  handleImageUpload = async ({ image_path }) => {
    await this.props.onImageUpload(image_path);
    this.handleClose();
  };

  handleCrop = data => {};

  render() {
    return (
      <Modal
        onClose={() => this.handleClose()}
        zIndex={1100}
        title={this.props.title}
        position="center"
        getWidth={"400px"}
        headerContainerClassName={""}
        headerTitleClassName={"text-dark"}
      >
        <Cropper
          ref="cropper"
          src={`https://images.unsplash.com/photo-1454779132693-e5cd0a216ed3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80`}
          style={{ width: "100%" }}
          // Cropper.js options
          aspectRatio={1}
          guides={false}
          crop={this.handleCrop}
          zoomable={false}
          viewMode={3}
        />
      </Modal>
    );
  }
}
