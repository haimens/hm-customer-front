import React, { Component } from "react";
import { Modal } from "../../../../components/shared";

export default class CouponAdding extends Component {
  handleClose = () => {
    this.props.onClose();
  };
  handleSignIn = async () => {
    await this.props.signInFromTrip();
    this.props.history.push("/login");
  };
  handleCreateAccount = () => {
    this.props.history.push("/create");
  };
  render() {
    return (
      <div>
        <Modal
          title="Do you have an account? Please sign in."
          onClose={this.handleClose}
          position="center"
          getWidth={"550px"}
          getHeight={"334px"}
        >
          <div className="container py-5">
            <div className="d-flex justify-content-center flex-column align-items-center">
              <div className="col-9">
                <button
                  type="button"
                  className="btn round-trip-button w-100 text-white hm-input-height"
                  onClick={this.handleSignIn}
                >
                  Sign In
                </button>
              </div>
              <div className="col-9 mt-4">
                <button
                  type="button"
                  className="btn contact-sales-button text-white w-100 hm-input-height"
                  onClick={() => this.handleClose()}
                >
                  Sign In As Guest
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
