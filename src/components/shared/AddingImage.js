import React, { Component } from "react";
export default class CompanyImage extends Component {
  handleClose = e => {
    if (e) e.preventDefault();
    if (this.props.onClose) this.props.onClose();
  };

  handleModal = e => {
    if (e) e.preventDefault();
    this.props.handleShowImage();
  };

  render() {
    return (
      <div className="bg-white align-items-center pt-2" style={{ height: "48px" }}>
        <div className="row">
          <div className="col-2">
            <label className="text-main-color font-weight-bold hm-text-14" htmlFor="logo">
              {this.props.title}
            </label>
          </div>

          <div className="col-3 px-0 d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="d-flex hm-text-14 justify-content-center ml-2 p-0 align-items-center btn btn-outline-secondary"
              onClick={e => this.handleModal(e)}
              style={{ borderRadius: "12px", width: "88px", height: "24px" }}
            >
              Upload
            </button>
          </div>
          <div className="col-7 d-flex justify-content-end">
            {this.props.parentProps.img_url && (
              <img
                className="hm-pointer-cursor rounded-circle"
                onClick={() => this.props.parentProps.handleShowPreview()}
                src={this.props.parentProps.img_url}
                alt="icon"
                width={"24px"}
                height={"24px"}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
