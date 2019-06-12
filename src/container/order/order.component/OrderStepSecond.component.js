import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderMapDetail from "./OrderMapDetail.component";
import {
  saveDate,
  saveTime,
  savePassenger,
  saveDateAgain,
  saveTimeAgain,
  savePassengerAgain,
  saveFlight,
  saveFlightAgain
} from "../../../actions/location.action";

class OrderStepSecond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickup_location: "",
      dropoff_location: "",
      pickup_date: "",
      pickup_time: "",
      passenger_amount: 1,

      pickup_location_again: "",
      dropoff_location_again: "",
      pickup_date_again: "",
      pickup_time_again: "",
      passenger_amount_again: 1,
      flight: ""
    };
  }

  handleChangePosition = page => {
    this.props.handleChangePosition(page);
  };

  render() {
    const {
      pickup_location,
      dropoff_location,
      pickup_date,
      pickup_time,
      passenger_amount,
      pickup_location_again,
      dropoff_location_again,
      pickup_date_again,
      pickup_time_again,
      passenger_amount_again,
      roundTrip
    } = this.props;
    return (
      <section className="pt-4 pb-4">
        <div className="col-10 mx-auto">
          <OrderMapDetail
            trip={1}
            parentProps={{ pickup_location, dropoff_location, pickup_date, pickup_time, passenger_amount }}
          />
          {roundTrip.boolean && (
            <OrderMapDetail
              trip={2}
              parentProps={{
                pickup_location: pickup_location_again,
                dropoff_location: dropoff_location_again,
                pickup_date: pickup_date_again,
                pickup_time: pickup_time_again,
                passenger_amount: passenger_amount_again
              }}
            />
          )}

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

const mapDispatchToProps = {
  saveDate,
  saveTime,
  savePassenger,
  saveDateAgain,
  saveTimeAgain,
  savePassengerAgain,
  saveFlight,
  saveFlightAgain
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderStepSecond));
