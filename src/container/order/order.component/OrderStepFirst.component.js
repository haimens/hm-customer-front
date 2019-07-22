import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderForm from "./orderStepFirst.component/OrderForm.component";

class OrderStepFirst extends Component {
  state = {
    roundTrip: false
  };

  handleTripType = () => {
    this.setState(state => ({ roundTrip: !state.roundTrip }));
  };

  render() {
    const { roundTrip } = this.state;
    return (
      <section className="pb-5" style={{ minHeight: "540px" }}>
        <div className="col-md-10 col-12 mx-auto border shadow">
          <div className="container">
            <div className="d-flex align-items-center" style={{ height: "86px" }}>
              <h3 className="mt-3">Trip Detail</h3>
            </div>
            <OrderForm pickup={"PICKUP"} dropoff={"DROPOFF"} />
            {roundTrip && (
              <div>
                <OrderForm pickup={"PICKUPAGAIN"} dropoff={"DROPOFFAGAIN"} />
              </div>
            )}
            <div className="row pb-5">
              <div className="col-4">
                <button
                  type="button"
                  className="btn round-trip-button w-100 text-white hm-input-height"
                  onClick={this.handleTripType}
                >
                  {roundTrip ? "One Way" : "Round Trip"}
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
)(withRouter(OrderStepFirst));
