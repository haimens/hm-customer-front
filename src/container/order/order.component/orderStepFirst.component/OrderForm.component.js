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
      <div className="row border-top mt-3 mb-5">
        <div className="col-lg-6 col-12 mt-5">
          <label className="font-weight-bold" htmlFor="pickup_location">
            Pickup Location
          </label>
          <div className="border rounded p-1">
            <GAutoComplete
              placeholder={pickup}
              disablePlaceHolder={true}
              defaultValue={pickup_location && pickup_location[0].formatted_address}
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
              placeholder={dropoff}
              disablePlaceHolder={true}
              defaultValue={dropoff_location && dropoff_location[0].formatted_address}
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
              onChange={onDateChange}
              disabledDate={this.disabledDate}
              id="date"
              size="large"
              placeholder={""}
            />
          </div>
        </div>
        <div className="col-lg-3 col-12 mt-4">
          <label className="font-weight-bold" htmlFor="pickup_time">
            Time
          </label>
          <div className="border rounded p-1">
            <TimePicker
              onChange={onTimeChange}
              defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
              placeholder={""}
              size="large"
              format="HH:mm"
              id="time"
            />
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
                  type="text"
                />
              </div>
            </div>
            <div className="border rounded p-1 ml-3 w-100">
              <div className="input-group">
                <input
                  className={`form-control hm-input-height google-input border-0`}
                  placeholder="Flight Number"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
