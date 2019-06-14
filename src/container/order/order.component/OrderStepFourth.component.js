import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderStepFourthDetail from "./orderStepFourth.component/OrderStepFourthDetail.component";
import alertify from "alertifyjs";

class OrderStepFourth extends Component {
  render() {
    const { firstTrip, secondTrip, roundTrip } = this.props;
    return (
      <section className="pt-4 pb-4">
        <div className="col-10 mx-auto">
          <OrderStepFourthDetail trip={1} parentProps={firstTrip} handleTripAmount={this.handleFirstTripAmount} />
          {roundTrip && (
            <div>
              <hr className="my-5" />
              <OrderStepFourthDetail trip={2} parentProps={secondTrip} handleTripAmount={this.handleSecondTripAmount} />
            </div>
          )}
          <hr className="my-5" />
          <h4 className="haimens-main-text-28 text-right">{`Total Due: $${136}`}</h4>
          <div className="row py-5">
            <div className="col-4">
              <button
                type="button"
                className="btn haimens-main-button-outline w-100 haimens-input-height"
                onClick={() => this.handleChangePosition(-1)}
              >
                Back
              </button>
            </div>
            <div className="col-4">
              <button type="button" className="btn haimens-button-bgColor-sub text-white w-100 haimens-input-height">
                Contact Sales
              </button>
            </div>
            <div className="col-4">
              <button
                type="button"
                className="btn haimens-main-bgColor text-white w-100 haimens-input-height"
                onClick={() => this.handleChangePosition(1)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => {
  return {
    firstTrip: state.locationReducer.firstTrip,
    secondTrip: state.locationReducer.secondTrip,
    roundTrip: state.locationReducer.roundTrip
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(OrderStepFourth));
