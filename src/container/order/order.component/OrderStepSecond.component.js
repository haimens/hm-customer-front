import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderMapDetail from "./OrderMapDetail.component";

class OrderStepSecond extends Component {
  handleChangePosition = page => {
    this.props.handleChangePosition(page);
  };

  render() {
    const { firstTrip, secondTrip, roundTrip } = this.props;
    return (
      <section className="pt-4 pb-4">
        <div className="col-10 mx-auto">
          <OrderMapDetail trip={1} parentProps={firstTrip} />
          {roundTrip && <OrderMapDetail trip={2} parentProps={secondTrip} />}

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
)(withRouter(OrderStepSecond));
