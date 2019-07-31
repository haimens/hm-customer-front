import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TripDetail from "./orderDetail.share/tripDetail.component";
import {
  saveFirstTripQuoteLocally,
  saveSecondTripQuoteLocally,
  setMapToFalse,
  saveFirstTripLocally,
  saveSecondTripLocally,
  setFirstMapToFalse,
  setSecondMapToFalse
} from "../../../actions/local.action";
import { findOrderLocationPrice, findOrderLocationPriceAgain } from "../../../actions/order.action";
import alertify from "alertifyjs";
import UpdateOrderModal from "./orderDetail.share/UpdateOrder.modal";
class OrderStepSecond extends Component {
  state = {
    showTripSignIn: false,
    selected: "",
    selected_again: "",
    showUpdateModal: false,
    num: ""
  };
  handleContinue = () => {
    const { selected, selected_again } = this.state;
    const { saveFirstTripQuoteLocally, saveSecondTripQuoteLocally, round_trip } = this.props;
    if (selected) {
      if (round_trip && selected_again) {
        Promise.all([saveFirstTripQuoteLocally(selected), saveSecondTripQuoteLocally(selected_again)]);
        this.props.handleChangePosition(1);
      } else if (!round_trip) {
        Promise.all([saveFirstTripQuoteLocally(selected)]);
        this.props.handleChangePosition(1);
      } else {
        alertify.alert("Warning", "Please Select a Vehicle for Second Trip.");
      }
    } else {
      alertify.alert("Warning", "Please Select a Vehicle for First Trip.");
    }
  };

  handleEditTripDetail = num => {
    this.setState({ num, showUpdateModal: true });
  };
  handleCloseUpdateOrderModal = () => {
    this.setState({ showUpdateModal: false });
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
    const {
      round_trip,
      first_trip,
      second_trip,
      first_local_trip,
      second_local_trip,
      findOrderLocationPrice,
      findOrderLocationPriceAgain,
      saveFirstTripLocally,
      saveSecondTripLocally,
      setMapToFalse,
      setFirstMapToFalse,
      setSecondMapToFalse
    } = this.props;
    const { showUpdateModal, num } = this.state;
    return (
      <section className="pb-5">
        {showUpdateModal && (
          <UpdateOrderModal
            num={num}
            setFirstMapToFalse={setFirstMapToFalse}
            setSecondMapToFalse={setSecondMapToFalse}
            setMapToFalse={setMapToFalse}
            trip={num === 1 ? first_local_trip : second_local_trip}
            findOrderLocationPrice={findOrderLocationPrice}
            findOrderLocationPriceAgain={findOrderLocationPriceAgain}
            saveFirstTripLocally={saveFirstTripLocally}
            saveSecondTripLocally={saveSecondTripLocally}
            onClose={this.handleCloseUpdateOrderModal}
          />
        )}
        <div className="col-md-10 col-12 mx-auto shadow">
          <div className="pb-5">
            <TripDetail
              num={1}
              handleEditTripDetail={this.handleEditTripDetail}
              handleOnButtonSelected={this.handleOnButtonSelected}
              trip={first_trip}
            />
          </div>
          {round_trip && (
            <div className="pb-5">
              <TripDetail
                num={2}
                handleEditTripDetail={this.handleEditTripDetail}
                handleOnButtonSelected={this.handleOnButtonSelectedAgain}
                trip={second_trip}
              />
            </div>
          )}
          <div className="container py-5">
            <div className="row">
              <div className="col-md-4 col-12 mt-3">
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
              <div className="col-md-4 col-12 mt-3">
                <button
                  type="button"
                  className="btn contact-sales-button text-white w-100 hm-input-height d-flex justify-content-between align-items-center"
                  onClick={() => window.Tawk_API.toggle()}
                >
                  <img src={`${process.env.PUBLIC_URL}/img/icon_phone_white.svg`} alt="roundTrip" />
                  <div> Contact Sales</div>
                  <div style={{ width: "20px" }} />
                </button>
              </div>
              <div className="col-md-4 col-12 mt-3">
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
    round_trip: state.orderReducer.round_trip,
    first_local_trip: state.localReducer.first_local_trip,
    second_local_trip: state.localReducer.second_local_trip
  };
};

const mapDispatchToProps = {
  findOrderLocationPrice,
  findOrderLocationPriceAgain,
  saveFirstTripLocally,
  saveSecondTripLocally,
  saveFirstTripQuoteLocally,
  saveSecondTripQuoteLocally,
  setMapToFalse,
  setFirstMapToFalse,
  setSecondMapToFalse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderStepSecond));
