import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderStepFourthDetail from "./orderStepFourth.component/OrderStepFourthDetail.component";
import alertify from "alertifyjs";
import "./OrderStepFourth.component.css";
class OrderStepFourth extends Component {
  state = {
    firstTripAmount: "",
    secondTripAmount: ""
  };

  handleFirstTripAmount = firstTripAmount => {
    this.setState({ firstTripAmount });
  };

  handleSecondTripAmount = secondTripAmount => {
    this.setState({ secondTripAmount });
  };
  handleChangePosition = position => {
    this.props.handleChangePosition(position);
  };

  render() {
    const { firstTrip, secondTrip, roundTrip } = this.props;
    return (
      <section className="pt-4 pb-4">
        <div className="col-10 mx-auto">
          {/* <OrderStepFourthDetail trip={1} parentProps={firstTrip} handleTripAmount={this.handleFirstTripAmount} />
          {roundTrip && (
            <div>
              <hr className="my-5" />
              <OrderStepFourthDetail trip={2} parentProps={secondTrip} handleTripAmount={this.handleSecondTripAmount} />
            </div>
          )} */}
          <hr className="my-5" />
          <div className="row">
            <div className="col-6">
              <h4 className="haimens-main-text-28">Passenger Information</h4>
              <h4 className="haimens-main-text-14 mt-4">
                Name:
                <span>{` Chrin `}</span>
              </h4>
              <h4 className="haimens-main-text-14 mt-4">
                Phone:
                <span>{` Chrin `}</span>
              </h4>
              <h4 className="haimens-main-text-14 mt-4">
                Email:
                <span>{` Chrin `}</span>
              </h4>
              <h4 className="haimens-main-text-14 mt-4">
                Special Instruction:
                <span>{` Chrin `}</span>
              </h4>
            </div>
            <div className="col-6">
              <h4 className="haimens-main-text-28">Coupon</h4>
              <h4 className="haimens-main-text-14 mt-4">Coupon Code</h4>
              <div className="d-flex  mt-4">
                <input
                  className={`form-control haimens-input-height`}
                  placeholder="Other"
                  id="other"
                  type="text"
                  value={123}
                />
                <button className="btn haimens-main-bgColor text-white stepFour-button-custom ml-4">Apply</button>
              </div>
            </div>
          </div>
          <div className="mt-5 text-right">
            <h4 className="haimens-main-text-22">Subtotal: $</h4>
            <h4 className="haimens-main-text-22">Discount: $</h4>
            <h4 className="haimens-main-text-28">Total Due: $</h4>
          </div>
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
