import React, { Component } from "react";
import moment from "moment";
import { DatePicker, TimePicker } from "antd";
import GAutoComplete from "../../../../components/shared/GAutoComplete";

export default class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roundTrip: false,
      passenger_amount: "",
      flight: ""
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

  componentDidMount() {
    this.setState({ passenger_amount: this.props.trip.passenger_amount, flight: this.props.trip.flight });
  }

  render() {
    const { onDateChange, onTimeChange, pickup, dropoff, trip } = this.props;
    const { pickup_location, dropoff_location, pickup_date, pickup_time, roundTrip } = trip;
    const { flight, passenger_amount } = this.state;
    return (
      <div className="row">
        <div className="col-6">
          <label className="haimens-margin-top-35 font-weight-bold" htmlFor="pickup_location">
            Pickup Location
          </label>
          <GAutoComplete
            placeholder={pickup}
            disablePlaceHolder={true}
            defaultValue={pickup_location && pickup_location[0].formatted_address}
            inputClass={"border-left-0"}
          />
        </div>
        <div className="col-6">
          <label className="haimens-margin-top-35 font-weight-bold" htmlFor="dropoff_location">
            Dropoff Location
          </label>
          <GAutoComplete
            placeholder={dropoff}
            disablePlaceHolder={true}
            defaultValue={dropoff_location && dropoff_location[0].formatted_address}
            inputClass={"border-left-0"}
          />
        </div>
        <div className="col-3">
          <label className="haimens-margin-top-35 font-weight-bold" htmlFor="pickup_date">
            Date
          </label>
          <div className="d-flex">
            <span className="input-group-text bg-white border-right-0 main-addon">
              <i className="far fa-calendar-times addon-color" />
            </span>
            {roundTrip ? (
              pickup_date !== "" ? (
                <DatePicker
                  onChange={onDateChange}
                  disabledDate={this.disabledDate}
                  defaultValue={moment(pickup_date._d)}
                  id="date"
                  size="large"
                  placeholder={""}
                />
              ) : (
                <DatePicker
                  onChange={onDateChange}
                  disabledDate={this.disabledDate}
                  id="date"
                  size="large"
                  placeholder={""}
                />
              )
            ) : (
              <DatePicker
                onChange={onDateChange}
                disabledDate={this.disabledDate}
                defaultValue={moment(pickup_date._d)}
                id="date"
                size="large"
                placeholder={""}
              />
            )}
          </div>
        </div>
        <div className="col-3">
          <label className="haimens-margin-top-35 font-weight-bold" htmlFor="pickup_time">
            Time
          </label>
          <div className="d-flex">
            <span className="input-group-text bg-white border-right-0 main-addon">
              <i className="far fa-clock addon-color time-clock" />
            </span>
            {roundTrip ? (
              pickup_time !== "" ? (
                <TimePicker
                  onChange={onTimeChange}
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                  defaultValue={moment(pickup_time._d)}
                  placeholder={""}
                  size="large"
                  format="HH:mm"
                  id="time"
                />
              ) : (
                <TimePicker
                  onChange={onTimeChange}
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                  placeholder={""}
                  size="large"
                  format="HH:mm"
                  id="time"
                />
              )
            ) : (
              <TimePicker
                onChange={onTimeChange}
                defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                defaultValue={moment(pickup_time._d)}
                placeholder={""}
                size="large"
                format="HH:mm"
                id="time"
              />
            )}
          </div>
        </div>
        <div className="col-3">
          <label className="haimens-margin-top-35 font-weight-bold" htmlFor="passenger_amount">
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
          <label className="haimens-margin-top-35 font-weight-bold" htmlFor="flight">
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
