import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TripDetail from "./orderStepSecond.component/tripDetail.component";

class OrderStepSecond extends Component {
  render() {
    return (
      <section className="pb-5">
        <div className="col-md-10 col-12 mx-auto shadow">
          <div className="pb-5">
            <TripDetail />
          </div>
          <div className="pb-5">
            <TripDetail />
          </div>
          <div className="container py-5">
            <div className="row">
              <div className="col-4">
                <button
                  type="button"
                  className="btn round-trip-button w-100 text-white hm-input-height"
                  onClick={this.handleTripType}
                >
                  {/* {round_trip ? "One Way" : "Round Trip"} */}
                  One Way
                </button>
              </div>
              <div className="col-4">
                <button type="button" className="btn contact-sales-button text-white w-100 hm-input-height">
                  Contact Sales
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn get-price-button text-white w-100 hm-input-height"
                  onClick={this.handleChangePosition}
                >
                  Get Price
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderStepSecond));
