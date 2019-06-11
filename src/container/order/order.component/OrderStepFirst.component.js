import React, { Component } from "react";
import OrderForm from "./OrderForm.component";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  saveDate,
  saveTime,
  savePassenger,
  saveDateAgain,
  saveTimeAgain,
  savePassengerAgain
} from "../../../actions/location.action";
import moment from "moment";

class OrderStepFirst extends Component {
  state = {
    roundedTrip: false
  };

  onDateChange = date => {
    console.log(moment(date).format("LL"));
  };

  onTimeChange = time => {
    console.log(moment(time).format("hh:mm a"));
  };

  updatePassenger = number => {
    console.log(number);
  };

  updateFlight = text => {
    console.log(text);
  };

  onDateChangeAgain = date => {
    console.log(moment(date).format("LL"));
  };

  onTimeChangeAgain = time => {
    console.log(moment(time).format("hh:mm a"));
  };

  updatePassengerAgain = number => {
    console.log(number);
  };

  updateFlightAgain = text => {
    console.log(text);
  };

  handleTripType = async () => {
    await this.setState(states => ({ roundedTrip: !states.roundedTrip }));
  };

  handleChangePosition = () => {
    this.props.handleChangePosition(1);
  };

  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { roundedTrip } = this.state;
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
          {roundedTrip && (
            <div>
              <hr className="haimens-margin-top-35" />
              <OrderForm
                pickup={"PICKUPAGAIN"}
                dropoff={"DROPOFFAGAIN"}
                parentProps={this.props}
                onDateChange={this.onDateChange}
                onTimeChange={this.onTimeChange}
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
                {roundedTrip ? "One Way" : "Round Trip"}
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
    pickup_date: state.locationReducer.pickup_date,
    pickup_time: state.locationReducer.pickup_time,
    passenger_amount: state.locationReducer.passenger_amount
  };
};

const mapDispatchToProps = { saveDate, saveTime, savePassenger, saveDateAgain, saveTimeAgain, savePassengerAgain };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderStepFirst));
