import React, { Component } from "react";
import moment from "moment";
import { DatePicker, TimePicker } from "antd";
import GAutoComplete from "../../../../components/shared/GAutoComplete";

export default class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roundTrip: false,
      airline_code: "",
      flight_number: ""
    };
  }
  getPickupLocation = address => {
    this.props.getPickupLocation(address[0].formatted_address);
  };
  getDropOffLocation = address => {
    this.props.getDropOffLocation(address[0].formatted_address);
  };
  handleDatePicker = date => {
    this.props.getDate(date);
  };
  handleTimePicker = time => {
    this.props.getTime(time);
  };

  disabledDate(current) {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return current && current.valueOf() < date;
  }

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
    if (id === "airline_code") {
      this.props.getAirlineCode(value);
    }
    if (id === "flight_number") {
      this.props.getFlightNumber(value);
    }
  };

  componentDidMount() {}

  render() {
    const { airline_code, flight_number } = this.state;
    const { date, time, pickup_location, dropoff_location } = this.props.trip;
    return (
      <div className="row border-top mt-3 mb-5">
        <div className="col-lg-6 col-12 mt-5">
          <label className="font-weight-bold" htmlFor="pickup_location">
            Pickup Location
          </label>
          <div className="border rounded p-1">
            <GAutoComplete
              defaultValue={pickup_location}
              placeholder={"Pickup Location"}
              getAddress={this.getPickupLocation}
              inputClass={"border-left-0"}
            />
          </div>
        </div>
        <div className="col-lg-6 col-12 mt-5">
          <label className="font-weight-bold" htmlFor="dropoff_location">
            Dropoff Location
          </label>
          <div className="border rounded p-1">
            <GAutoComplete
              defaultValue={dropoff_location}
              getAddress={this.getDropOffLocation}
              placeholder={"Dropoff Location"}
              inputClass={"border-left-0"}
            />
          </div>
        </div>
        <div className="col-lg-3 col-12 mt-4">
          <label className="font-weight-bold" htmlFor="pickup_date">
            Date
          </label>
          <div className="border rounded p-1">
            <DatePicker
              value={date}
              disabledDate={this.disabledDate}
              onChange={this.handleDatePicker}
              id="date"
              size="large"
            />
          </div>
        </div>
        <div className="col-lg-3 col-12 mt-4">
          <label className="font-weight-bold" htmlFor="pickup_time">
            Time
          </label>
          <div className="border rounded p-1">
            <TimePicker value={time} onChange={this.handleTimePicker} size="large" format="HH:mm" id="time" />
          </div>
        </div>
        <div className="col-lg-6 col-12  mt-4">
          <label className="font-weight-bold" htmlFor="flight">
            Flight Number
          </label>
          <div className="d-flex ">
            <div className="border rounded p-1 mr-3 w-100">
              <div className="input-group">
                <input
                  className={`form-control hm-input-height google-input border-0`}
                  placeholder="Airline Code"
                  value={airline_code}
                  id="airline_code"
                  type="text"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="border rounded p-1 ml-3 w-100">
              <div className="input-group">
                <input
                  className={`form-control hm-input-height google-input border-0`}
                  placeholder="Flight Number"
                  value={flight_number}
                  id="flight_number"
                  type="text"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
