import React, { Component } from "react";
import "./OrderPagination.component.css";

export default class OrderPagination extends Component {
  render() {
    const { position } = this.props;
    return (
      <div className="trip-tab">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "141px" }}>
          <h1 className="text-center text-white trip-header">Book a Trip</h1>
        </div>
        <div className="container-fluid">
          <div className="col-md-10 col-12 px-0 offset-md-1 offset-0">
            <div className="row">
              <div
                className={`col-3 d-flex justify-content-center align-items-center custom-radius-top-left tab border-right hm-pointer-cursor ${position ===
                  0 && "bg-purple"}`}
              >
                <div className={`${position === 0 ? "text-white" : "hm-main-textColor"} font-weight-bold hm-text-12`}>
                  {position === 0 ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/img/icon_location_white.svg`}
                      alt="error404"
                      className="mr-3 d-none d-md-inline-flex"
                    />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/img/icon_location_dark.svg`}
                      alt="error404"
                      className="mr-3 d-none d-md-inline-flex"
                    />
                  )}
                  Location & time
                </div>
              </div>
              <div
                className={`col-3 d-flex justify-content-center align-items-center tab border-right hm-pointer-cursor ${position ===
                  1 && "bg-purple"}`}
              >
                <div className={`${position === 1 ? "text-white" : "hm-main-textColor"} font-weight-bold hm-text-12`}>
                  {position === 1 ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/img/icon_vehicle_white.svg`}
                      alt="error404"
                      className="mr-3 d-none d-md-inline-flex"
                    />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/img/icon_vehicle.svg`}
                      alt="error404"
                      className="mr-3 d-none d-md-inline-flex"
                    />
                  )}
                  Price Quote
                </div>
              </div>
              <div
                className={`col-3 d-flex justify-content-center align-items-center tab border-right hm-pointer-cursor ${position ===
                  2 && "bg-purple"}`}
              >
                <div className={`${position === 2 ? "text-white" : "hm-main-textColor"} font-weight-bold hm-text-12`}>
                  {position === 2 ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/img/icon_contact_white.svg`}
                      alt="error404"
                      className="mr-3 d-none d-md-inline-flex"
                    />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/img/icon_contact.svg`}
                      alt="error404"
                      className="mr-3 d-none d-md-inline-flex"
                    />
                  )}
                  Contact Information
                </div>
              </div>
              <div
                className={`col-3 d-flex justify-content-center align-items-center custom-radius-top-right tab border-right hm-pointer-cursor ${position ===
                  3 && "bg-purple"}`}
              >
                <div className={`${position === 3 ? "text-white" : "hm-main-textColor"} font-weight-bold hm-text-12`}>
                  {position === 3 ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/img/icon_payment_white.svg`}
                      alt="error404"
                      className="mr-3 d-none d-md-inline-flex"
                    />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/img/icon_payment.svg`}
                      alt="error404"
                      className="mr-3 d-none d-md-inline-flex"
                    />
                  )}
                  Payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
