import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TripDetail from "./orderDetail.share/tripDetail.component";
import TripSignIn from "./orderStepSecond.component/tripSignIn.modal";
import { Modal } from "../../../components/shared";
import { saveFirstTripQuoteLocally, saveSecondTripQuoteLocally, setMapToFalse } from "../../../actions/local.action";
import alertify from "alertifyjs";
class OrderStepSecond extends Component {
  state = {
    showTripSignIn: false,
    selected: "",
    selected_again: ""
  };
  handleContinue = () => {
    const { selected, selected_again } = this.state;
    const { saveFirstTripQuoteLocally, saveSecondTripQuoteLocally, round_trip } = this.props;
    if (selected) {
      if (round_trip && selected_again) {
        Promise.all([saveFirstTripQuoteLocally(selected), saveSecondTripQuoteLocally(selected_again)]);
        this.setState({ showTripSignIn: true });
      } else if (!round_trip) {
        Promise.all([saveFirstTripQuoteLocally(selected)]);
        this.setState({ showTripSignIn: true });
      } else {
        alertify.alert("Warning", "Please Select a Vehicle for Second Trip.");
      }
    } else {
      alertify.alert("Warning", "Please Select a Vehicle for First Trip.");
    }
  };
  handleGoBack = () => {
    this.props.setMapToFalse();
    this.props.handleChangePosition(-1);
  };
  handleCloseShowSignIn = () => {
    this.setState({ showTripSignIn: false });
  };
  handleOnButtonSelected = quote_token => {
    this.setState({ selected: quote_token });
  };
  handleOnButtonSelectedAgain = quote_token => {
    this.setState({ selected_again: quote_token });
  };
  render() {
    const { showTripSignIn } = this.state;
    const { history, round_trip, first_trip, second_trip, handleChangePosition } = this.props;
    return (
      <section className="pb-5">
        {showTripSignIn && (
          <TripSignIn
            handleChangePosition={handleChangePosition}
            history={history}
            onClose={this.handleCloseShowSignIn}
          />
        )}
        <div className="col-md-10 col-12 mx-auto shadow">
          <div className="pb-5">
            <TripDetail num={1} handleOnButtonSelected={this.handleOnButtonSelected} trip={first_trip} />
          </div>
          {round_trip && (
            <div className="pb-5">
              <TripDetail num={2} handleOnButtonSelected={this.handleOnButtonSelectedAgain} trip={second_trip} />
            </div>
          )}
          <div className="container py-5">
            <div className="row">
              <div className="col-4">
                <button
                  type="button"
                  className="btn back-button w-100 hm-input-height hm-main-textColor hm-text-main-14 font-weigh-bold d-flex justify-content-between align-items-center"
                  onClick={this.handleGoBack}
                >
                  <img src={`${process.env.PUBLIC_URL}/img/icon_back.svg`} alt="roundTrip" />
                  <div>Back</div>
                  <div style={{ width: "20px" }} />
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn contact-sales-button text-white w-100 hm-input-height d-flex justify-content-between align-items-center"
                >
                  <img src={`${process.env.PUBLIC_URL}/img/icon_phone_white.svg`} alt="roundTrip" />
                  <div> Contact Sales</div>
                  <div style={{ width: "20px" }} />
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn round-trip-button text-white w-100 hm-input-height hm-text-main-14 font-weigh-bold d-flex justify-content-between align-items-center"
                  onClick={this.handleContinue}
                >
                  <div style={{ width: "20px" }} />
                  <div>Continue</div>
                  <img src={`${process.env.PUBLIC_URL}/img/icon_continue.svg`} alt="roundTrip" />
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

const mapDispatchToProps = {
  saveFirstTripQuoteLocally,
  saveSecondTripQuoteLocally,
  setMapToFalse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderStepSecond));
