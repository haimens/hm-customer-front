import React, { Component } from "react";
import moment from "moment";
import { DatePicker, TimePicker } from "antd";
import GAutoComplete from "../../../components/shared/GAutoComplete";

export default class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickup_location: "",
      dropoff_location: "",
      pickup_date: "",
      pickup_time: "",
      passenger_amount: 1,
      flight: "",
      roundTrip: false
    };
  }

  disabledDate(current) {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return current && current.valueOf() < date;
  }

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
    if (id === "passenger_amount") {
      this.props.updatePassenger(value);
    }
    if (id === "flight") {
      this.props.updateFlight(value);
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.pickup === "PICKUPAGAIN" || props.dropoff === "DROPOFFAGAIN") {
      return {
        roundTrip: true
      };
    }
    const { pickup_location, dropoff_location, pickup_date, pickup_time, passenger_amount } = props.parentProps;
    if (
      state.pickup_location !== pickup_location.location &&
      state.dropoff_location !== dropoff_location.location &&
      state.pickup_date !== pickup_date.date &&
      state.pickup_time !== pickup_time.time &&
      state.passenger_amount !== passenger_amount
    ) {
      return {
        pickup_location: pickup_location.location[0].formatted_address,
        dropoff_location: dropoff_location.location[0].formatted_address,
        pickup_date: pickup_date.date,
        pickup_time: pickup_time.time,
        passenger_amount: passenger_amount.number
      };
    }
    return null;
  }

  render() {
    const { onDateChange, onTimeChange } = this.props;
    const {
      pickup_location,
      dropoff_location,
      pickup_date,
      pickup_time,
      passenger_amount,
      flight,
      roundTrip
    } = this.state;
    return (
      <div className="row">
        <div className="col-6">
          <label className="haimens-margin-top-35{ font-weight-bold" htmlFor="pickup_location">
            Pickup Location
          </label>
          <GAutoComplete
            placeholder={this.props.pickup}
            disablePlaceHolder={true}
            defaultValue={pickup_location}
            inputClass={"border-left-0"}
          />
        </div>
        <div className="col-6">
          <label className="haimens-margin-top-35{ font-weight-bold" htmlFor="dropoff_location">
            Dropoff Location
          </label>
          <GAutoComplete
            placeholder={this.props.dropoff}
            disablePlaceHolder={true}
            defaultValue={dropoff_location}
            inputClass={"border-left-0"}
          />
        </div>
        <div className="col-3">
          <label className="haimens-margin-top-35{ font-weight-bold" htmlFor="pickup_date">
            Date
          </label>
          <div className="d-flex">
            <span className="input-group-text bg-white border-right-0 main-addon">
              <i className="far fa-calendar-times addon-color" />
            </span>
            {roundTrip ? (
              <DatePicker
                onChange={onDateChange}
                disabledDate={this.disabledDate}
                id="date"
                size="large"
                placeholder={""}
              />
            ) : (
              <DatePicker
                onChange={onDateChange}
                disabledDate={this.disabledDate}
                defaultValue={moment(pickup_date)}
                id="date"
                size="large"
                placeholder={""}
              />
            )}
          </div>
        </div>
        <div className="col-3">
          <label className="haimens-margin-top-35{ font-weight-bold" htmlFor="pickup_time">
            Time
          </label>
          <div className="d-flex">
            <span className="input-group-text bg-white border-right-0 main-addon">
              <i className="far fa-clock addon-color time-clock" />
            </span>
            {roundTrip ? (
              <TimePicker
                onChange={onTimeChange}
                defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                placeholder={""}
                size="large"
                format="HH:mm"
                id="time"
              />
            ) : (
              <TimePicker
                onChange={onTimeChange}
                defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                defaultValue={moment(pickup_time)}
                placeholder={""}
                size="large"
                format="HH:mm"
                id="time"
              />
            )}
          </div>
        </div>
        <div className="col-3">
          <label className="haimens-margin-top-35{ font-weight-bold" htmlFor="passenger_amount">
            Passenger
          </label>
          <div className="d-flex">
            <span className="input-group-text bg-white border-right-0 main-addon">
              <i className="far fa-user addon-color" />
            </span>
            <input
              type="number"
              id="passenger_amount"
              className="form-control haimens-input-height border-left-0"
              onChange={this.handleInputChange}
              value={passenger_amount}
            />
          </div>
        </div>
        <div className="col-3">
          <label className="haimens-margin-top-35{ font-weight-bold" htmlFor="flight">
            Flight Number
          </label>
          <div className="d-flex">
            <span className="input-group-text bg-white border-right-0 main-addon">
              <i className="fas fa-plane addon-color" />
            </span>
            <input
              type="text"
              id="flight"
              className="form-control haimens-input-height border-left-0"
              onChange={this.handleInputChange}
              value={flight}
            />
          </div>
        </div>
      </div>
    );
  }
}
