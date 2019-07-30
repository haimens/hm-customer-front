import React, { Component } from "react";
import ImageUploader from "../ImageUpload/lib/ImageUpload";

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

  handleImageUpload = async image_path => {
    await this.props.onImageUpload(image_path);
    this.handleClose();
  };

  render() {
    return (
      <ImageUploader
        title={this.props.title}
        onClose={this.handleClose}
        havana_image_url={`${process.env.REACT_APP_HAVANA_IMAGE_URL}`}
        app_token={`${process.env.REACT_APP_IMAGE_APP_TOKEN}`}
        app_key={`${process.env.REACT_APP_IMAGE_APP_KEY}`}
        data_type="avatar"
        onImageUpload={this.handleImageUpload}
      />
    );
  }
}
