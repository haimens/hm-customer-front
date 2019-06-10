import React, { Component } from "react";
import { Modal } from "../shared";
import ImageUploader from "../ImageUpload/lib/index";

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
        <ImageUploader
          app_token={`${process.env.REACT_APP_IMAGE_APP_TOKEN}`}
          app_key={`${process.env.REACT_APP_IMAGE_APP_KEY}`}
          data_type="avatar"
          onImageUpload={this.handleImageUpload}
          imageProcessMode={true}
          btnControlClassName="d-flex justify-content-between"
          imageContainerClassName="p-2"
        />
      </Modal>
    );
  }
}
