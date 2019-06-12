import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import alertify from "alertifyjs";
import OrderForm from "./OrderForm.component";
import {
  saveDate,
  saveTime,
  savePassenger,
  saveDateAgain,
  saveTimeAgain,
  savePassengerAgain,
  saveFlight,
  saveFlightAgain,
  saveRoundTrip
} from "../../../actions/location.action";

class OrderStepFirst extends Component {
  state = {
    roundTrip: false,
    firstTrip: {
      pickup_date: "",
      pickup_time: "",
      passenger_amount: "",
      flight: ""
    },
    secondTrip: {
      pickup_date: "",
      pickup_time: "",
      passenger_amount: "",
      flight: ""
    }
  };

  onDateChange = date => {
    this.setState({ pickup_date: moment(date) });
  };

  onTimeChange = time => {
    this.setState({ pickup_time: moment(time) });
  };

  updatePassenger = passenger_amount => {
    this.setState({ passenger_amount });
  };

  updateFlight = flight => {
    this.setState({ flight });
  };

  onDateChangeAgain = date => {
    this.setState({ pickup_date_again: moment(date) });
  };

  onTimeChangeAgain = time => {
    this.setState({ pickup_time_again: moment(time) });
  };

  updatePassengerAgain = passenger_amount_again => {
    this.setState({ passenger_amount_again });
  };

  updateFlightAgain = flight_again => {
    this.setState({ flight_again });
  };

  handleTripType = async () => {
    await this.setState(states => ({ roundTrip: !states.roundTrip }));
  };

  handleChangePosition = async () => {
    const { firstTrip, secondTrip, roundTrip } = this.state;
    const { pickup_date, pickup_time, passenger_amount, flight } = firstTrip;
    if (roundTrip.boolean) {
      const { pickup_location, dropoff_location } = this.props.firstTrip;
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
      if (
        pickup_date !== "" &&
        pickup_time !== "" &&
        passenger_amount !== "" &&
        pickup_date_again !== "" &&
        pickup_time_again !== "" &&
        passenger_amount_again !== "" &&
        pickup_location.location !== "" &&
        dropoff_location.location !== "" &&
        pickup_location_again.location !== "" &&
        dropoff_location_again.location !== ""
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

          this.props.saveRoundTrip(true)
        ]);
        this.props.handleChangePosition(1);
      } else {
        alertify.alert("Something Wrong", "Please Finished the Form Before Submit!");
      }
    }
    if (!roundTrip.boolean) {
      const { pickup_location, dropoff_location } = this.props.firstTrip;
      if (
        pickup_date.date !== "" &&
        pickup_time.time !== "" &&
        passenger_amount.number !== "" &&
        pickup_location.location !== "" &&
        dropoff_location.location !== ""
      ) {
        await Promise.all([
          this.props.saveDate(pickup_date),
          this.props.saveTime(pickup_time),
          this.props.savePassenger(passenger_amount),
          this.props.saveFlight(flight),
          this.props.saveRoundTrip(false)
        ]);
        this.props.handleChangePosition(1);
      } else {
        alertify.alert("Something Wrong", "Please Finished the Form Before Submit!");
      }
    }
  };

  componentDidMount = async () => {
    const { pickup_location, dropoff_location, pickup_date, pickup_time, passenger_amount } = this.props.firstTrip;
    if (
      pickup_location.location === "" ||
      dropoff_location.location === "" ||
      pickup_date.date === "" ||
      pickup_time.time === "" ||
      passenger_amount.number === ""
    ) {
      this.props.history.push("/");
    }
  };

  static getDerivedStateFromProps(props, state) {
    const { roundTrip, firstTrip, secondTrip } = props;
    const { pickup_date, pickup_time, passenger_amount } = firstTrip;

    const { pickup_date_again, pickup_time_again, passenger_amount_again } = secondTrip;
    if (roundTrip.boolean) {
      if (
        state.firstTrip.pickup_date !== pickup_date.date &&
        state.firstTrip.pickup_time !== pickup_time.time &&
        state.firstTrip.passenger_amount !== passenger_amount.number
      ) {
        if (pickup_date_again.date !== "") {
          return {
            firstTrip: {
              pickup_date: pickup_date,
              pickup_time: pickup_time,
              passenger_amount: passenger_amount.number
            },
            secondTrip: {
              pickup_date: pickup_date_again,
              pickup_time: pickup_time_again,
              passenger_amount: passenger_amount_again
            },
            roundTrip: roundTrip
          };
        }
        return {
          firstTrip: {
            pickup_date: pickup_date,
            pickup_time: pickup_time,
            passenger_amount: passenger_amount
          }
        };
      }
    }
    if (!roundTrip.boolean) {
      if (
        state.firstTrip.pickup_date !== pickup_date.date &&
        state.firstTrip.pickup_time !== pickup_time.time &&
        state.firstTrip.passenger_amount !== passenger_amount.number
      ) {
        return {
          firstTrip: {
            pickup_date: pickup_date,
            pickup_time: pickup_time,
            passenger_amount: passenger_amount
          },
          roundTrip: roundTrip
        };
      }
    }
    return null;
  }

  render() {
    const { roundTrip } = this.state;
    const { firstTrip, secondTrip } = this.props;
    console.log(this.state.firstTrip);
    console.log(this.props);
    return (
      <section>
        <div className="col-10 mx-auto my-5">
          <h3>Trip Detail</h3>
          <OrderForm
            pickup={"PICKUP"}
            dropoff={"DROPOFF"}
            trip={{
              pickup_location: firstTrip.pickup_location,
              dropoff_location: firstTrip.dropoff_location,
              ...this.state.firstTrip
            }}
            onDateChange={this.onDateChange}
            onTimeChange={this.onTimeChange}
            updatePassenger={this.updatePassenger}
            updateFlight={this.updateFlight}
          />
          {roundTrip.boolean && (
            <div>
              <hr className="haimens-margin-top-35" />
              <OrderForm
                pickup={"PICKUPAGAIN"}
                dropoff={"DROPOFFAGAIN"}
                trip={{
                  pickup_location: secondTrip.pickup_location,
                  dropoff_location: secondTrip.dropoff_location,
                  ...this.state.secondTrip
                }}
                onDateChange={this.onDateChangeAgain}
                onTimeChange={this.onTimeChangeAgain}
                updatePassenger={this.updatePassengerAgain}
                updateFlight={this.updateFlightAgain}
              />
            </div>
          )}
          <div className="row py-5">
            <div className="col-4">
              <button
                type="button"
                className="btn haimens-main-button-outline w-100 haimens-input-height"
                onClick={this.handleTripType}
              >
                {roundTrip.boolean ? "One Way" : "Round Trip"}
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
                onClick={this.handleChangePosition}
              >
                Get Price
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
  saveFlightAgain,
  saveRoundTrip
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderStepFirst));
