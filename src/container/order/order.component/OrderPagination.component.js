import React, { Component } from "react";
import "./OrderPagination.component.css";

export default class OrderPagination extends Component {
  render() {
    return (
      <div className="d-flex justify-content-between flex-column flex-md-row">
        <div className="d-flex align-items-center ">
          <div className="badge text-white haimens-main-text-14 haimens-main-bgColor rounded-circle my-auto ">{1}</div>
          <h3 className="haimens-main-text-16 ml-4 ">Location & Time</h3>
        </div>

        <div className="d-flex align-items-center my-2 my-md-0">
          <div
            className={`badge haimens-main-text-14 rounded-circle my-auto ${
              this.props.position >= 1 ? "text-white haimens-main-bgColor" : "order-badge-border-inactive"
            }`}
          >
            {2}
          </div>
          <h3
            className={`haimens-main-text-16 ml-4 ${
              this.props.position >= 1 ? "haimens-main-textColor " : "order-badge-text-inactive"
            }`}
          >
            Service
          </h3>
        </div>

        <div className="d-flex align-items-center ">
          <div
            className={`badge haimens-main-text-14 rounded-circle my-auto ${
              this.props.position >= 2 ? "text-white haimens-main-bgColor" : "order-badge-border-inactive"
            }`}
          >
            {3}
          </div>
          <h3
            className={`haimens-main-text-16 ml-4 ${
              this.props.position >= 2 ? "haimens-main-textColor " : "order-badge-text-inactive"
            }`}
          >
            Contact Information
          </h3>
        </div>

        <div className="d-flex align-items-center my-2 my-md-0">
          <div
            className={`badge haimens-main-text-14 rounded-circle my-auto ${
              this.props.position >= 3 ? "text-white haimens-main-bgColor" : "order-badge-border-inactive"
            }`}
          >
            {4}
          </div>
          <h3
            className={`haimens-main-text-16 ml-4 ${
              this.props.position >= 3 ? "haimens-main-textColor " : "order-badge-text-inactive"
            }`}
          >
            Payment
          </h3>
        </div>

        <div className="d-flex align-items-center ">
          <div
            className={`badge haimens-main-text-14 rounded-circle my-auto ${
              this.props.position >= 4 ? "text-white haimens-main-bgColor" : "order-badge-border-inactive"
            }`}
          >
            {5}
          </div>
          <h3
            className={`haimens-main-text-16 ml-4 ${
              this.props.position >= 4 ? "haimens-main-textColor " : "order-badge-text-inactive"
            }`}
          >
            Complete
          </h3>
        </div>
      </div>
    );
  }
}
