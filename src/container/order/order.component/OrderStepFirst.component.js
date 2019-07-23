import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderForm from "./orderStepFirst.component/OrderForm.component";
import { findOrderLocationPrice, findOrderLocationPriceAgain, setRoundTrip } from "../../../actions/order.action";
import { convertUTCtoLocal } from "../../../actions/utilities.action";
import alertify from "alertifyjs";
import moment from "moment";
class OrderStepFirst extends Component {
  state = {
    roundTrip: false,
    first_trip: {
      date: "",
      time: "",
      airline_code: "",
      flight_number: "",
      pickup_location: "",
      dropoff_location: "",
      flight_str: ""
    },
    second_trip: {
      date: "",
      time: "",
      airline_code: "",
      flight_number: "",
      pickup_location: "",
      dropoff_location: "",
      flight_str: ""
    },
    flight_number: "",
    airline_code: "",
    flight_number_again: "",
    airline_code_again: ""
  };

  handleTripType = () => {
    this.setState(state => ({ roundTrip: !state.roundTrip }));
  };

  setUpFirstTrip = type => detail => {
    if (type === "flystr") {
      this.setState(state => ({ first_trip: { ...state.first_trip, flight_str: detail } }));
    }
    if (type === "date") {
      this.setState(state => ({ first_trip: { ...state.first_trip, date: detail } }));
    }
    if (type === "time") {
      this.setState(state => ({ first_trip: { ...state.first_trip, time: detail } }));
    }
    if (type === "airlineCode") {
      this.setState(state => ({ first_trip: { ...state.first_trip, airline_code: detail } }));
    }
    if (type === "flightNumber") {
      this.setState(state => ({ first_trip: { ...state.first_trip, flight_number: detail } }));
    }
    if (type === "dropoff") {
      this.setState(state => ({ first_trip: { ...state.first_trip, dropoff_location: detail } }));
    }
    if (type === "pickup") {
      this.setState(state => ({ first_trip: { ...state.first_trip, pickup_location: detail } }));
    }
  };
  setUpSecondTrip = type => detail => {
    if (type === "flystr") {
      this.setState(state => ({ first_trip: { ...state.first_trip, flight_str: detail } }));
    }
    if (type === "date") {
      this.setState(state => ({ second_trip: { ...state.second_trip, date: detail } }));
    }
    if (type === "time") {
      this.setState(state => ({ second_trip: { ...state.second_trip, time: detail } }));
    }
    if (type === "airlineCode") {
      this.setState(state => ({ second_trip: { ...state.second_trip, airline_code: detail } }));
    }
    if (type === "flightNumber") {
      this.setState(state => ({ second_trip: { ...state.second_trip, flight_number: detail } }));
    }
    if (type === "dropoff") {
      this.setState(state => ({ second_trip: { ...state.second_trip, dropoff_location: detail } }));
    }
    if (type === "pickup") {
      this.setState(state => ({ second_trip: { ...state.second_trip, pickup_location: detail } }));
    }
  };

  handleChangePosition = () => {
    const {
      first_trip,
      second_trip,
      roundTrip,
      flight_number,
      airline_code,
      flight_number_again,
      airline_code_again
    } = this.state;
    if (roundTrip) {
      if (
        first_trip.pickup_location &&
        first_trip.dropoff_location &&
        first_trip.date &&
        first_trip.time &&
        second_trip.pickup_location &&
        second_trip.dropoff_location &&
        second_trip.date &&
        second_trip.time
      ) {
        Promise.all([
          this.props.findOrderLocationPrice({
            from_address_str: first_trip.pickup_location,
            to_address_str: first_trip.dropoff_location,
            pickup_time: convertUTCtoLocal(moment(`${first_trip.date} ${first_trip.time}`)),
            pickup_time_local: `${first_trip.date} ${first_trip.time}`
          }),
          this.props.findOrderLocationPriceAgain({
            from_address_str: second_trip.pickup_location,
            to_address_str: second_trip.dropoff_location,
            pickup_time: convertUTCtoLocal(moment(`${second_trip.date} ${second_trip.time}`)),
            pickup_time_local: `${second_trip.date} ${second_trip.time}`
          }),
          this.props.setRoundTrip(true)
        ]);
      } else {
        alertify.alert("Warning!", "Please Finish The Form.");
      }
    } else {
      if (first_trip.pickup_location && first_trip.dropoff_location && first_trip.date && first_trip.time) {
        this.props.findOrderLocationPrice({
          from_address_str: first_trip.pickup_location,
          to_address_str: first_trip.dropoff_location,
          pickup_time: convertUTCtoLocal(moment(`${first_trip.date} ${first_trip.time}`)),
          pickup_time_local: `${first_trip.date} ${first_trip.time}`
        });
        this.props.setRoundTrip(true);
      } else {
        alertify.alert("Warning!", "Please Finish The Form.");
      }
    }
  };

  render() {
    const { roundTrip, flight_number, airline_code, flight_number_again, airline_code_again } = this.state;
    return (
      <section className="pb-5" style={{ minHeight: "540px" }}>
        <div className="col-md-10 col-12 mx-auto shadow">
          <div className="container">
            <div className="d-flex align-items-center" style={{ height: "86px" }}>
              <h3 className="mt-3">Trip Detail</h3>
            </div>
            <OrderForm
              getDate={this.setUpFirstTrip("date")}
              getTime={this.setUpFirstTrip("time")}
              getAirlineCode={this.setUpFirstTrip("airlineCode")}
              getFlightNumber={this.setUpFirstTrip("flightNumber")}
              getPickupLocation={this.setUpFirstTrip("pickup")}
              getDropOffLocation={this.setUpFirstTrip("dropoff")}
            />
            {roundTrip && (
              <div>
                <OrderForm
                  getFlightString={this.setUpFirstTrip("flystr")}
                  getDate={this.setUpSecondTrip("date")}
                  getTime={this.setUpSecondTrip("time")}
                  getAirlineCode={this.setUpSecondTrip("airlineCode")}
                  getFlightNumber={this.setUpSecondTrip("flightNumber")}
                  getPickupLocation={this.setUpSecondTrip("pickup")}
                  getDropOffLocation={this.setUpSecondTrip("dropoff")}
                />
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

const mapDispatchToProps = { findOrderLocationPrice, findOrderLocationPriceAgain, setRoundTrip };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderStepFirst));
