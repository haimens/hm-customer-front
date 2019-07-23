import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TripDetail from "./orderStepSecond.component/tripDetail.component";
import TripSignIn from "./orderStepSecond.component/tripSignIn.modal";
import { Modal } from "../../../components/shared";

class OrderStepSecond extends Component {
  state = {
    showTripSignIn: false
  };
  handleShowSignIn = () => {
    this.setState({ showTripSignIn: true });
  };
  handleCloseShowSignIn = () => {
    this.setState({ showTripSignIn: false });
  };
  render() {
    const { showTripSignIn } = this.state;
    const { round_trip, first_trip, second_trip } = this.props;
    return (
      <section className="pb-5">
        {showTripSignIn && <TripSignIn onClose={this.handleCloseShowSignIn} />}
        <div className="col-md-10 col-12 mx-auto shadow">
          <div className="pb-5">
            <TripDetail trip={first_trip} />
          </div>
          {round_trip && (
            <div className="pb-5">
              <TripDetail trip={second_trip} />
            </div>
          )}
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
                  onClick={this.handleShowSignIn}
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
  return {
    first_trip: state.orderReducer.first_trip,
    second_trip: state.orderReducer.second_trip,
    round_trip: state.orderReducer.round_trip
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderStepSecond));
