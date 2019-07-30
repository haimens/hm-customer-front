import React, { Component } from "react";
import "cropperjs/dist/cropper.css";
import { Modal, Loader } from "../../shared";
import Cropper from "react-cropper";
import request from "./request";
/**
 * ImageLoaderModal
 * @title
 * @onClose
 * @onImageUpload
 * @havana_image_url
 * @app_token
 * @app_key
 */
export default class ImageUploader extends Component {
  state = {
    image_url: "",
    cropped_image: "",
    loading: false
  };

  handleClose = () => {
    if (this.props.onClose) this.props.onClose();
  };

  handleImageSubmit = async e => {
    if (!this.props.havana_image_url) throw new Error("MISSING IMAGE URL IN UPLOAD IMAGE");
    if (!this.props.app_token) throw new Error("MISSING APP TOKEN IN UPLOAD IMAGE");
    if (!this.props.app_key) throw new Error("MISSING APP_KEY IN UPLOAD IMAGE");
    e.preventDefault();
    try {
      // process image
      const formData = new FormData();
      formData.append("image", this.state.cropped_image);
      const acceptedDataTypes = ["logo", "avatar", "icon"];
      const isAcceptedDataTypes = acceptedDataTypes.includes(this.props.data_type);
      if (!isAcceptedDataTypes) {
        throw new Error("NOT A ACCEPTED DATA TYPE");
      }
      await this.setState({ loading: true });
      const { payload } = await request(
        "POST",
        this.props.havana_image_url,
        `api/v0/${this.props.data_type}/file`,
        formData,
        {
          app_token: this.props.app_token,
          app_key: this.props.app_key
        }
      );
      await this.setState({ loading: false });
      // send image data to props
      this.props.onImageUpload(payload.image_path);
      this.handleClose();
    } catch (err) {
      throw err;
    }
  };

  handleCrop = data => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const canvas = this.refs.cropper.getCroppedCanvas();
      this.convertCanvasToBlob(canvas).then(data => {
        this.setState({ cropped_image: data });
      });
    }, 1);
  };

  handleImageUpload = async e => {
    e.preventDefault();
    try {
      const imageFileList = e.target.files;
      if (imageFileList.length === 0) {
        return;
      }
      const image_url = await this.getBaseUrl(imageFileList[0]);
      this.setState({
        ...this.state,
        image_url
      });
    } catch (err) {
      throw err;
    }
  };

  convertCanvasToBlob = canvas => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) {
          blob.name = new Date().getTime();
          resolve(blob);
        }
      }, "image/jpeg");
    });
  };

  getBaseUrl = image => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  render() {
    return (
      <div>
        {this.state.loading && <Loader />}
        <Modal
          onClose={() => this.handleClose()}
          zIndex={3}
          title={this.props.title}
          position="center"
          getWidth={"600px"}
          getHeight={"600px"}
          headerContainerClassName={""}
          headerTitleClassName={"text-dark"}
        >
          <section className="d-flex justify-content-between p-4">
            <input type="file" onChange={this.handleImageUpload} accept="image/png, image/jpeg" />
            <button
              onClick={this.handleImageSubmit}
              disabled={!this.state.cropped_image}
              className="btn bg-purple text-white"
            >
              Upload
            </button>
          </section>
          <section className="d-flex justify-content-center p-4">
            {this.state.image_url && (
              <Cropper
                autoCropArea={1}
                ref="cropper"
                src={this.state.image_url}
                style={{ width: "100%", height: "400px" }}
                // aspectRatio={this.props.aspectRatio}
                guides={true}
                viewMode={1}
                crop={this.handleCrop}
                zoomable={false}
              />
            )}
          </section>
        </Modal>
      </div>
    );
  }
}
