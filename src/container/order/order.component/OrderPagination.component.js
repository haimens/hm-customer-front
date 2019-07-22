import React, { Component } from "react";
import "./OrderPagination.component.css";

export default class OrderPagination extends Component {
  render() {
    const{position} = this.props;
    return (
      <div className="trip-tab">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "141px" }}>
          <h1 className="text-center text-white trip-header">Book a Trip</h1>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className={`col-2 d-flex justify-content-center align-items-center offset-1 custom-radius-top-left tab border-right hm-pointer-cursor ${position === 0 && "bg-purple"}`}>
              <div
                className={`${
                  position === 0 ? "text-white" : "hm-main-textColor"
                } font-weight-bold hm-text-12`}
              >
                Location and time
              </div>
            </div>
            <div className={`col-2 d-flex justify-content-center align-items-center tab border-right hm-pointer-cursor ${position === 1 && "bg-purple"}`}>
              <div
                className={`${
                  position === 1 ? "text-white" : "hm-main-textColor"
                } font-weight-bold hm-text-12`}
              >
                Vehicle Type
              </div>
            </div>
            <div className={`col-2 d-flex justify-content-center align-items-center tab border-right hm-pointer-cursor ${position === 2 && "bg-purple"}`}>
              <div
                className={`${
                  position === 2 ? "text-white" : "hm-main-textColor"
                } font-weight-bold hm-text-12`}
              >
                Contact Information
              </div>
            </div>
            <div className={`col-2 d-flex justify-content-center align-items-center tab border-right hm-pointer-cursor ${position === 3 && "bg-purple"}`}>
              <div
                className={`${
                  position === 3 ? "text-white" : "hm-main-textColor"
                } font-weight-bold hm-text-12`}
              >
                Payment
              </div>
            </div>
            <div className={`col-2 d-flex justify-content-center align-items-center custom-radius-top-right tab border-right hm-pointer-cursor ${position === 4 && "bg-purple"}`}>
              <div
                className={`${
                  position === 4 ? "text-white" : "hm-main-textColor"
                } font-weight-bold hm-text-12`}
              >
                Complete
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
