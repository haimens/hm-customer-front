import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import alertify from "alertifyjs";
import OrderForm from "./orderStepFirst.component/OrderForm.component";
import {
  saveDate,
  saveTime,
  savePassenger,
  saveDateAgain,
  saveTimeAgain,
  savePassengerAgain,
  saveFlight,
  saveFlightAgain,
  saveRoundTrip,
  savePickUpAgain,
  saveDropOffAgain
} from "../../../actions/location.action";

import { findOrderLocationPrice, findOrderLocationPriceAgain } from "../../../actions/order.action";
import { convertLocalToUTC } from "../../../actions/utilities.action";

class OrderStepFirst extends Component {
  state = {
    roundTrip: false,
    firstTrip: {
      pickup_date: "",
      pickup_time: "",
      passenger_amount: 1,
      flight: ""
    },
    secondTrip: {
      pickup_date: "",
      pickup_time: "",
      passenger_amount: 1,
      flight: ""
    }
  };
  onDateChange = date => {
    this.setState(states => ({ ...states, firstTrip: { ...states.firstTrip, pickup_date: moment(date) } }));
  };

  onTimeChange = time => {
    this.setState(states => ({ ...states, firstTrip: { ...states.firstTrip, pickup_time: moment(time) } }));
  };

  updatePassenger = passenger_amount => {
    this.setState(states => ({ ...states, firstTrip: { ...states.firstTrip, passenger_amount } }));
  };

  updateFlight = flight => {
    this.setState(states => ({ ...states, firstTrip: { ...states.firstTrip, flight } }));
  };

  onDateChangeAgain = date => {
    this.setState(states => ({ ...states, secondTrip: { ...states.secondTrip, pickup_date: moment(date) } }));
  };

  onTimeChangeAgain = async time => {
    this.setState(states => ({ ...states, secondTrip: { ...states.secondTrip, pickup_time: moment(time) } }));
  };

  updatePassengerAgain = passenger_amount => {
    this.setState(states => ({ ...states, secondTrip: { ...states.secondTrip, passenger_amount } }));
  };

  updateFlightAgain = flight => {
    this.setState(states => ({ ...states, secondTrip: { ...states.secondTrip, flight } }));
  };

  handleTripType = async () => {
    await this.setState(states => ({ roundTrip: !states.roundTrip }));
  };

  handleChangePosition = async () => {
    const { firstTrip, secondTrip, roundTrip } = this.state;
    const { pickup_date, pickup_time, passenger_amount, flight } = firstTrip;
    const { pickup_location, dropoff_location } = this.props.firstTrip;
    if (roundTrip) {
      const {
        pickup_location: pickup_location_again,
        dropoff_location: dropoff_location_again
      } = this.props.secondTrip;
      const {
        pickup_date: pickup_date_again,
        pickup_time: pickup_time_again,
        passenger_amount: passenger_amount_again,
        flight: flight_again
      } = secondTrip;
      let time = `${moment(pickup_date).format("MM-DD-YYYY")} ${moment(pickup_time).format("HH:mm:ss")}`;
      let timeSecond = `${moment(pickup_date_again).format("MM-DD-YYYY")} ${moment(pickup_time_again).format(
        "HH:mm:ss"
      )}`;

      if (
        pickup_date !== "" &&
        pickup_time !== "" &&
        passenger_amount !== "" &&
        pickup_date_again !== "" &&
        pickup_time_again !== "" &&
        passenger_amount_again !== "" &&
        pickup_location !== "" &&
        dropoff_location !== "" &&
        pickup_location_again !== "" &&
        dropoff_location_again !== ""
      ) {
        await Promise.all([
          this.props.saveDate(pickup_date),
          this.props.saveTime(pickup_time),
          this.props.savePassenger(passenger_amount),
          this.props.saveFlight(flight),

          this.props.saveDateAgain(pickup_date_again),
          this.props.saveTimeAgain(pickup_time_again),
          this.props.savePassengerAgain(passenger_amount_again),
          this.props.saveFlightAgain(flight_again),
          this.props.saveRoundTrip(true),
          this.props.findOrderLocationPrice({
            from_address_str: pickup_location[0].formatted_address,
            to_address_str: dropoff_location[0].formatted_address,
            pickup_time: convertLocalToUTC(time)
          }),
          this.props.findOrderLocationPriceAgain({
            from_address_str: pickup_location_again[0].formatted_address,
            to_address_str: dropoff_location_again[0].formatted_address,
            pickup_time: convertLocalToUTC(timeSecond)
          })
        ]);

        this.props.handleChangePosition(1);
      } else {
        alertify.alert("Something Wrong", "Please Finished the Form Before Submit!");
      }
    }
    if (!roundTrip) {
      if (
        pickup_date.date !== "" &&
        pickup_time.time !== "" &&
        passenger_amount !== "" &&
        pickup_location !== "" &&
        dropoff_location !== ""
      ) {
        let time = `${moment(pickup_date).format("MM-DD-YYYY")} ${moment(pickup_time).format("HH:mm:ss")}`;
        await Promise.all([
          this.props.saveDate(pickup_date),
          this.props.saveTime(pickup_time),
          this.props.savePassenger(passenger_amount),
          this.props.saveFlight(flight),
          this.props.saveRoundTrip(false),

          this.props.saveDateAgain(""),
          this.props.saveTimeAgain(""),
          this.props.savePassengerAgain(""),
          this.props.saveFlightAgain(""),
          this.props.savePickUpAgain(""),
          this.props.saveDropOffAgain(""),
          this.props.findOrderLocationPrice({
            from_address_str: pickup_location[0].formatted_address,
            to_address_str: dropoff_location[0].formatted_address,
            pickup_time: convertLocalToUTC(time)
          })
        ]);

        this.props.handleChangePosition(1);
      } else {
        alertify.alert("Something Wrong", "Please Finished the Form Before Submit!");
      }
    }
  };

  componentDidMount = async () => {
    // const { roundTrip, firstTrip, secondTrip } = this.props;
    // const { pickup_location, dropoff_location, pickup_date, pickup_time, passenger_amount, flight } = firstTrip;
    // const {
    //   pickup_date: pickup_date_again,
    //   pickup_time: pickup_time_again,
    //   passenger_amount: passenger_amount_again,
    //   flight: flight_again
    // } = secondTrip;
    // if (
    //   pickup_location === "" ||
    //   dropoff_location === "" ||
    //   pickup_date === "" ||
    //   pickup_time.time === "" ||
    //   passenger_amount.number === ""
    // ) {
    //   this.props.history.push("/");
    // }
    // if (roundTrip) {
    //   if (pickup_date_again !== "") {
    //     await this.setState({
    //       firstTrip: {
    //         pickup_date: pickup_date,
    //         pickup_time: pickup_time,
    //         passenger_amount: passenger_amount,
    //         flight: flight
    //       },
    //       secondTrip: {
    //         pickup_date: pickup_date_again,
    //         pickup_time: pickup_time_again,
    //         passenger_amount: passenger_amount_again,
    //         flight: flight_again
    //       },
    //       roundTrip: roundTrip
    //     });
    //   }
    //   if (pickup_date_again === "") {
    //     await this.setState({
    //       firstTrip: {
    //         pickup_date: pickup_date,
    //         pickup_time: pickup_time,
    //         passenger_amount: passenger_amount,
    //         flight: flight
    //       },
    //       roundTrip: roundTrip
    //     });
    //   }
    // }
    // if (!roundTrip) {
    //   this.setState({
    //     firstTrip: {
    //       pickup_date: pickup_date,
    //       pickup_time: pickup_time,
    //       passenger_amount: passenger_amount,
    //       flight: flight
    //     },
    //     roundTrip: roundTrip
    //   });
    // }
  };

  render() {
    const { roundTrip } = this.state;
    const { firstTrip, secondTrip } = this.props;
    return (
      <section style={{ minHeight: "540px" }}>
        <div className="col-md-10 col-12 mx-auto border shadow">
          <div className="container">
            <div className="d-flex align-items-center" style={{ height: "86px" }}>
              <h3 className="mt-3">Trip Detail</h3>
            </div>
            <OrderForm
              pickup={"PICKUP"}
              dropoff={"DROPOFF"}
              trip={firstTrip}
              onDateChange={this.onDateChange}
              onTimeChange={this.onTimeChange}
              updatePassenger={this.updatePassenger}
              updateFlight={this.updateFlight}
            />
            {roundTrip && (
              <div>
                <OrderForm
                  pickup={"PICKUPAGAIN"}
                  dropoff={"DROPOFFAGAIN"}
                  trip={{ ...secondTrip, roundTrip }}
                  onDateChange={this.onDateChangeAgain}
                  onTimeChange={this.onTimeChangeAgain}
                  updatePassenger={this.updatePassengerAgain}
                  updateFlight={this.updateFlightAgain}
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
  saveFlightAgain,
  saveRoundTrip,
  savePickUpAgain,
  saveDropOffAgain,
  findOrderLocationPrice,
  findOrderLocationPriceAgain
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderStepFirst));
