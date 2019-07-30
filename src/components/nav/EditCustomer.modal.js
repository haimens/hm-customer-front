import React, { Component } from "react";
import { Modal, ImageLoaderModal, ImagePreviewModal, AddingImage } from "../shared";
import alertify from "alertifyjs";

export default class EditCustomer extends Component {
  state = {
    showImage: false,
    showPreview: false,
    name: "",
    area: "+1",
    email: "",
    cell: "",
    img_path: "",
    addr_str: "",
    note: ""
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  doNothing = () => {};

  handleShowImage = () => {
    this.setState(states => ({ showImage: !states.showImage }));
  };
  handleShowPreview = () => {
    this.setState(states => ({ showPreview: !states.showPreview }));
  };

  handleImageUpload = img_path => {
    this.setState({ img_path: img_path });
  };

  handleClose = () => {
    this.props.onClose();
  };

  saveToAddress = address => {
    this.setState({ addr_str: address[0].formatted_address });
  };

  handleUpdateCustomerInfo = async () => {
    const { name, cell, area, email, img_path, note } = this.state;
    const { updateCustomerInfo } = this.props;
    if (name !== "" && cell !== "" && area !== "" && email !== "") {
      updateCustomerInfo(localStorage.getItem("customer_token"), {
        name,
        img_path,
        cell: `${area} ${cell}`,
        email,
        note
      });

      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  async componentDidMount() {
    await this.props.getCustomerDetail(localStorage.getItem("customer_token"));
    const { name, cell, email, img_path } = this.props.customer_detail_in_customer;
    this.setState({ name, cell: cell.split(" ")[1], area: cell.split(" ")[0], email, img_path });
  }

  render() {
    const { img_path, showImage, showPreview, name, cell, area, email } = this.state;
    return (
      <div>
        {showImage && (
          <ImageLoaderModal
            onClose={() => this.setState({ showImage: false })}
            onImageUpload={this.handleImageUpload}
            title="Upload Image"
          />
        )}
        {showPreview && <ImagePreviewModal image={img_path} onClose={() => this.setState({ showPreview: false })} />}

        <Modal title="Update Info" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"500px"}>
          <div className="container">
            <div className="p-3">
              <div className="form-group mb-4">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Cell">
                  Email
                </label>
                <div>{email}</div>
              </div>
              <div className="form-group mb-4">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Cell">
                  Name
                </label>
                <input
                  className="form-control hm-input-height"
                  name="name"
                  id="name"
                  placeholder={"Name"}
                  value={name}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group input-group mb-4">
                <label className="text-main-color font-weight-bold hm-text-14 w-100" htmlFor="Cell">
                  Cell
                </label>
                <div className="container-fluid">
                  <div className="row">
                    <input
                      type="text"
                      className="form-control hm-input-height col-2"
                      id="area"
                      placeholder="Area"
                      value={area}
                      onChange={this.handleInputChange}
                    />

                    <input
                      type="text"
                      className="form-control hm-input-height col-10"
                      id="cell"
                      placeholder="Cell"
                      value={cell}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <AddingImage
                title={"Logo:"}
                parentProps={{ img_url: img_path, handleShowPreview: this.handleShowPreview }}
                handleShowImage={this.handleShowImage}
              />

              <div className="form-group text-right pt-3">
                <button
                  className="bg-purple btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleUpdateCustomerInfo}
                >
                  Update
                </button>
                <button onClick={this.handleClose} className="btn button-main-size btn-outline-secondary px-4">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
