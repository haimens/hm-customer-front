import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import alertify from "alertifyjs";
import OrderMapDetail from "./orderStepSecond.component/OrderStepSecondDetail.component";
import { saveAmount, saveAmountAgain } from "../../../actions/location.action";
import { parsePrice } from "../../../actions/utilities.action";

class OrderStepSecond extends Component {
  state = {
    firstTripAmount: 0,
    secondTripAmount: 0
  };
  handleChangePosition = position => {
    if (position < 0) {
      this.props.handleChangePosition(position);
      return;
    }
    const { firstTripAmount, secondTripAmount } = this.state;
    if (firstTripAmount > 0) {
      if (this.props.roundTrip) {
        if (secondTripAmount > 0) {
          this.props.saveAmount(firstTripAmount);
          this.props.saveAmountAgain(secondTripAmount);
          this.props.handleChangePosition(position);
        } else {
          alertify.alert("Something Wrong", "Please Select A Car For Trip #2");
        }
      }
      if (!this.props.roundTrip) {
        this.props.saveAmount(firstTripAmount);
        this.props.handleChangePosition(position);
      }
    } else {
      alertify.alert("Something Wrong", "Please Select a Car For Trip #1");
    }
  };
  handleFirstTripAmount = firstTripAmount => {
    this.setState({ firstTripAmount });
  };
  handleSecondTripAmount = secondTripAmount => {
    this.setState({ secondTripAmount });
  };
  render() {
    const { first_trip, second_trip, roundTrip } = this.props;
    const { firstTripAmount, secondTripAmount } = this.state;
    return (
      <section className="pt-4 pb-4">
        <div className="col-10 mx-auto">
          <OrderMapDetail trip={1} parentProps={first_trip} handleTripAmount={this.handleFirstTripAmount} />
          {roundTrip && (
            <div>
              <hr className="my-5" />
              <OrderMapDetail trip={2} parentProps={second_trip} handleTripAmount={this.handleSecondTripAmount} />
            </div>
          )}
          <hr className="my-5" />
          <h4 className="hm-main-text-28 text-right">{`Total Due: ${parsePrice(
            firstTripAmount + secondTripAmount
          )}`}</h4>
          <div className="row py-5">
            <div className="col-4">
              <button
                type="button"
                className="btn hm-main-button-outline w-100 hm-input-height"
                onClick={() => this.handleChangePosition(-1)}
              >
                Back
              </button>
            </div>
            <div className="col-4">
              <button type="button" className="btn hm-button-bgColor-sub text-white w-100 hm-input-height">
                Contact Sales
              </button>
            </div>
            <div className="col-4">
              <button
                type="button"
                className="btn hm-main-bgColor text-white w-100 hm-input-height"
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
    first_trip: state.orderReducer.first_trip,
    second_trip: state.orderReducer.second_trip,
    roundTrip: state.locationReducer.roundTrip
  };
};

const mapDispatchToProps = {
  saveAmount,
  saveAmountAgain
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderStepSecond));
