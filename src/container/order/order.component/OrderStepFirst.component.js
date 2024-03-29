import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderForm from "./orderStepFirst.component/OrderForm.component";
import {
  findOrderLocationPrice,
  findOrderLocationPriceAgain,
  setRoundTrip,
  findFlightListInLord
} from "../../../actions/order.action";
import { convertLocalToUTC } from "../../../actions/utilities.action";
import { saveFirstTripLocally, saveSecondTripLocally, setRoundTripLocally } from "../../../actions/local.action";
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

  handleTripType = async () => {
    await this.setState(state => ({ roundTrip: !state.roundTrip }));
    if (
      this.state.roundTrip &&
      this.state.second_trip.pickup_location === "" &&
      this.state.second_trip.dropoff_location === ""
    ) {
      this.setState(state => ({
        second_trip: {
          ...state.second_trip,
          pickup_location: state.first_trip.dropoff_location,
          dropoff_location: state.first_trip.pickup_location
        }
      }));
    }
  };

  setUpFirstTrip = type => async detail => {
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
      await this.setState({ airline_code: detail });
    }
    if (type === "flightNumber") {
      this.setState({ flight_number: detail });
    }
    if (type === "dropoff") {
      this.setState(state => ({
        first_trip: { ...state.first_trip, dropoff_location: document.getElementById("dropoff_giveId").value }
      }));
    }
    if (type === "pickup") {
      this.setState(state => ({
        first_trip: { ...state.first_trip, pickup_location: document.getElementById("pickup_giveId").value }
      }));
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
      this.setState({ airline_code_again: detail });
    }
    if (type === "flightNumber") {
      this.setState({ flight_number_again: detail });
    }
    if (type === "dropoff") {
      this.setState(state => ({
        second_trip: { ...state.second_trip, dropoff_location: document.getElementById("dropoff_giveId_again").value }
      }));
    }
    if (type === "pickup") {
      this.setState(state => ({
        second_trip: { ...state.second_trip, pickup_location: document.getElementById("pickup_giveId_again").value }
      }));
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
        second_trip.date &&
        second_trip.time
      ) {
        Promise.all([
          this.props.findOrderLocationPrice({
            from_address_str: first_trip.pickup_location,
            to_address_str: first_trip.dropoff_location,
            pickup_time: convertLocalToUTC(
              `${moment(first_trip.date).format("YYYY-MM-DD")} ${moment(first_trip.time).format("HH:mm:ss")}`
            ),
            pickup_time_local: `${moment(first_trip.date).format("YYYY-MM-DD")} ${moment(first_trip.time).format(
              "HH:mm:ss"
            )}`
          }),
          this.props.saveFirstTripLocally({
            from_address_str: first_trip.pickup_location,
            to_address_str: first_trip.dropoff_location,
            pickup_time: convertLocalToUTC(
              `${moment(first_trip.date).format("YYYY-MM-DD")} ${moment(first_trip.time).format("HH:mm:ss")}`
            ),
            pickup_time_local: `${moment(first_trip.date).format("YYYY-MM-DD")} ${moment(first_trip.time).format(
              "HH:mm:ss"
            )}`,
            flight_str: `${airline_code} ${flight_number}`
          }),
          this.props.findOrderLocationPriceAgain({
            from_address_str: document.getElementById("pickup_giveId_again").value,
            to_address_str: document.getElementById("dropoff_giveId_again").value,
            pickup_time: convertLocalToUTC(
              `${moment(second_trip.date).format("YYYY-MM-DD")} ${moment(second_trip.time).format("HH:mm:ss")}`
            ),
            pickup_time_local: `${moment(second_trip.date).format("YYYY-MM-DD")} ${moment(second_trip.time).format(
              "HH:mm:ss"
            )}`
          }),
          this.props.saveSecondTripLocally({
            from_address_str: document.getElementById("pickup_giveId_again").value,
            to_address_str: document.getElementById("dropoff_giveId_again").value,
            pickup_time: convertLocalToUTC(
              `${moment(second_trip.date).format("YYYY-MM-DD")} ${moment(second_trip.time).format("HH:mm:ss")}`
            ),
            pickup_time_local: `${moment(second_trip.date).format("YYYY-MM-DD")} ${moment(second_trip.time).format(
              "HH:mm:ss"
            )}`,
            flight_str: `${airline_code_again} ${flight_number_again}`
          }),
          this.props.setRoundTrip(true),
          this.props.setRoundTripLocally(true)
        ]);
        this.props.handleChangePosition(1);
      } else {
        alertify.alert("Warning!", "Please Finish The Form.");
      }
    } else {
      if (first_trip.pickup_location && first_trip.dropoff_location && first_trip.date && first_trip.time) {
        Promise.all([
          this.props.findOrderLocationPrice({
            from_address_str: first_trip.pickup_location,
            to_address_str: first_trip.dropoff_location,
            pickup_time: convertLocalToUTC(
              `${moment(first_trip.date).format("YYYY-MM-DD")} ${moment(first_trip.time).format("HH:mm:ss")}`
            ),
            pickup_time_local: `${moment(first_trip.date).format("YYYY-MM-DD")} ${moment(first_trip.time).format(
              "HH:mm:ss"
            )}`
          }),
          this.props.saveFirstTripLocally({
            from_address_str: first_trip.pickup_location,
            to_address_str: first_trip.dropoff_location,
            pickup_time: convertLocalToUTC(
              `${moment(first_trip.date).format("YYYY-MM-DD")} ${moment(first_trip.time).format("HH:mm:ss")}`
            ),
            pickup_time_local: `${moment(first_trip.date).format("YYYY-MM-DD")} ${moment(first_trip.time).format(
              "HH:mm:ss"
            )}`,
            flight_str: `${airline_code} ${flight_number}`
          }),
          this.props.setRoundTrip(false),
          this.props.setRoundTripLocally(false)
        ]);
        this.props.handleChangePosition(1);
      } else {
        alertify.alert("Warning!", "Please Finish The Form.");
      }
    }
  };

  async componentDidMount() {
    const { temp_order, first_local_trip, second_local_trip, round_trip_locally } = this.props;
    if (temp_order) {
      await this.setState(state => ({
        first_trip: {
          ...state.first_trip,
          date: this.props.temp_order.date,
          time: this.props.temp_order.time,
          pickup_location: this.props.temp_order.pickup_location,
          dropoff_location: this.props.temp_order.dropoff_location
        }
      }));
    } else {
      this.props.history.push(`/`);
    }
    if (first_local_trip !== "") {
      await this.setState(state => ({
        first_trip: {
          ...state.first_trip,
          date: moment(first_local_trip.pickup_time),
          time: moment(first_local_trip.pickup_time),
          pickup_location: first_local_trip.from_address_str,
          dropoff_location: first_local_trip.to_address_str
        },
        roundTrip: round_trip_locally
      }));
      if (first_local_trip.flight_str !== " " && first_local_trip.flight_str !== "") {
        this.setState({
          flight_number: first_local_trip.flight_str.split(" ")[1],
          airline_code: first_local_trip.flight_str.split(" ")[0]
        });
      }
    }
    if (second_local_trip !== "") {
      this.setState(state => ({
        second_trip: {
          ...state.second_trip,
          date: moment(second_local_trip.pickup_time),
          time: moment(second_local_trip.pickup_time),
          pickup_location: second_local_trip.from_address_str,
          dropoff_location: second_local_trip.to_address_str
        }
      }));
      if (second_local_trip.flight_str) {
        this.setState({
          flight_number_again: second_local_trip.flight_str.split(" ")[1],
          airline_code_again: second_local_trip.flight_str.split(" ")[0]
        });
      }
    }
  }

  render() {
    const {
      roundTrip,
      first_trip,
      second_trip,
      flight_number,
      airline_code,
      flight_number_again,
      airline_code_again
    } = this.state;
    const { findFlightListInLord, flight_list_in_lord } = this.props;
    return (
      <section className="pb-5" style={{ minHeight: "540px" }}>
        <div className="col-md-10 col-12 mx-auto shadow">
          <div className="pb-5">
            <div className="container">
              <div className="d-flex align-items-center justify-content-between " style={{ height: "86px" }}>
                <h3 className="mt-3 hm-main-textColor hm-text-22 font-weight-bold">Trip Detail</h3>
              </div>
              <OrderForm
                trip={first_trip}
                flight_list_in_lord={flight_list_in_lord}
                findFlightListInLord={findFlightListInLord}
                pickup_giveId={"pickup_giveId"}
                dropoff_giveId={"dropoff_giveId"}
                flight_number={flight_number}
                airline_code={airline_code}
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
                    trip={second_trip}
                    flight_list_in_lord={flight_list_in_lord}
                    findFlightListInLord={findFlightListInLord}
                    pickup_giveId={"pickup_giveId_again"}
                    dropoff_giveId={"dropoff_giveId_again"}
                    flight_number={flight_number_again}
                    airline_code={airline_code_again}
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
                <div className="col-md-4 col-12 mt-3 ">
                  <button
                    type="button"
                    className="btn round-trip-button w-100 text-white hm-input-height d-flex justify-content-between align-items-center"
                    onClick={this.handleTripType}
                  >
                    {roundTrip ? (
                      <img src={`${process.env.PUBLIC_URL}/img/icon_oneway.svg`} alt="oneway" />
                    ) : (
                      <img src={`${process.env.PUBLIC_URL}/img/icon_roundtrip.svg`} alt="roundTrip" />
                    )}
                    <div>{roundTrip ? "One Way" : "Round Trip"}</div>
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
                    className="btn get-price-button text-white w-100 hm-input-height d-flex justify-content-between align-items-center"
                    onClick={this.handleChangePosition}
                  >
                    <img src={`${process.env.PUBLIC_URL}/img/icon_price.svg`} alt="roundTrip" />
                    <div>Get Price</div>
                    <div style={{ width: "20px" }} />
                  </button>
                </div>
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
    temp_order: state.orderReducer.temp_order,
    first_local_trip: state.localReducer.first_local_trip,
    second_local_trip: state.localReducer.second_local_trip,
    round_trip_locally: state.localReducer.round_trip_locally,
    flight_list_in_lord: state.orderReducer.flight_list_in_lord
  };
};

const mapDispatchToProps = {
  findOrderLocationPrice,
  findOrderLocationPriceAgain,
  setRoundTrip,
  saveFirstTripLocally,
  saveSecondTripLocally,
  setRoundTripLocally,
  findFlightListInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderStepFirst));
