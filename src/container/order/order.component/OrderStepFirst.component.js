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
    pickup_date: "",
    pickup_time: "",
    passenger_amount: 1,
    flight: "",

    pickup_date_again: "",
    pickup_time_again: "",
    passenger_amount_again: 1,
    flight_again: ""
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
    console.log(passenger_amount_again);
    this.setState({ passenger_amount_again });
  };

  updateFlightAgain = flight_again => {
    this.setState({ flight_again });
  };

  handleTripType = async () => {
    await this.setState(states => ({ roundTrip: !states.roundTrip }));
  };

  handleChangePosition = async () => {
    const {
      pickup_date,
      pickup_time,
      passenger_amount,
      flight,
      pickup_date_again,
      pickup_time_again,
      passenger_amount_again,
      flight_again,
      roundTrip
    } = this.state;

    const { pickup_location, dropoff_location, pickup_location_again, dropoff_location_again } = this.props;
    if (roundTrip) {
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
    if (!roundTrip) {
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
    const { pickup_location, dropoff_location, pickup_date, pickup_time, passenger_amount } = this.props;
    if (
      pickup_location.location === "" ||
      dropoff_location.location === "" ||
      pickup_date.date === "" ||
      pickup_time.time === "" ||
      passenger_amount.number === ""
    ) {
      this.props.history.push("/");
    }
    await this.setState({
      pickup_date_again: "",
      pickup_time_again: "",
      passenger_amount_again: 1,
      flight_again: ""
    });
  };

  static getDerivedStateFromProps(props, state) {
    const { pickup_date, pickup_time, passenger_amount, roundTrip } = props;
    if (
      state.pickup_date !== pickup_date.date &&
      state.pickup_time !== pickup_time.time &&
      state.passenger_amount !== passenger_amount
    ) {
      return {
        pickup_date: pickup_date.date,
        pickup_time: pickup_time.time,
        passenger_amount: passenger_amount.number,
        roundTrip: roundTrip.boolean
      };
    }
    return null;
  }

  render() {
    const { roundTrip } = this.state;
    return (
      <section>
        <div className="col-10 mx-auto my-5">
          <h3>Trip Detail</h3>
          <OrderForm
            pickup={"PICKUP"}
            dropoff={"DROPOFF"}
            parentProps={this.props}
            onDateChange={this.onDateChange}
            onTimeChange={this.onTimeChange}
            updatePassenger={this.updatePassenger}
            updateFlight={this.updateFlight}
          />
          {roundTrip && (
            <div>
              <hr className="haimens-margin-top-35" />
              <OrderForm
                pickup={"PICKUPAGAIN"}
                dropoff={"DROPOFFAGAIN"}
                parentProps={this.props}
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
                {roundTrip ? "One Way" : "Round Trip"}
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
    pickup_location: state.locationReducer.pickup_location,
    dropoff_location: state.locationReducer.dropoff_location,
    pickup_location_again: state.locationReducer.pickup_location_again,
    dropoff_location_again: state.locationReducer.dropoff_location_again,
    pickup_date: state.locationReducer.pickup_date,
    pickup_time: state.locationReducer.pickup_time,
    passenger_amount: state.locationReducer.passenger_amount,
    pickup_date_again: state.locationReducer.pickup_date_again,
    pickup_time_again: state.locationReducer.pickup_time_again,
    passenger_amount_again: state.locationReducer.passenger_amount_again,
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
