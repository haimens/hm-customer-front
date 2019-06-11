import React, { Component } from "react";
import GAutoComplete from "../../../components/shared/GAutoComplete";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";

export default class OrderDetail extends Component {
  state = {
    passenger: 1,
    flight: ""
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  render() {
    const { onDateChange, onTimeChange } = this.props;
    const { pickup_location, dropoff_location } = this.props.parentProps;
    return (
      <div className="row">
        <div className="col-6">
          <label className="account-marginTop font-weight-bold" htmlFor="email">
            Pickup Location
          </label>
          <GAutoComplete
            placeholder={"PICKUP"}
            disablePlaceHolder={true}
            defaultValue={pickup_location.location}
            inputClass={"border-left-0"}
          />
        </div>
        <div className="col-6">
          <label className="account-marginTop font-weight-bold" htmlFor="email">
            Dropoff Location
          </label>
          <GAutoComplete
            placeholder={"DROPOFF"}
            disablePlaceHolder={true}
            defaultValue={dropoff_location.location}
            inputClass={"border-left-0"}
          />
        </div>
        <div className="col-3">
          <label className="account-marginTop font-weight-bold" htmlFor="email">
            Date
          </label>
          <div className="d-flex">
            <span className="input-group-text bg-white border-right-0 main-addon">
              <i className="far fa-calendar-times addon-color" />
            </span>
            <DatePicker
              onChange={onDateChange}
              disabledDate={this.disabledDate}
              id="date"
              size="large"
              placeholder={""}
            />
          </div>
        </div>
        <div className="col-3">
          <label className="account-marginTop font-weight-bold" htmlFor="email">
            Time
          </label>
          <div className="d-flex">
            <span className="input-group-text bg-white border-right-0 main-addon">
              <i className="far fa-clock addon-color time-clock" />
            </span>
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
        <div className="col-3">
          <label className="account-marginTop font-weight-bold" htmlFor="email">
            Passenger
          </label>
          <div className="d-flex">
            <span className="input-group-text bg-white border-right-0 main-addon">
              <i className="far fa-user addon-color" />
            </span>
            <input
              type="number"
              id="passenger"
              className="form-control haimens-input-height border-left-0"
              onChange={this.handleInputChange}
              value={this.state.passenger}
            />
          </div>
        </div>
        <div className="col-3">
          <label className="account-marginTop font-weight-bold" htmlFor="email">
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
              value={this.state.flight}
            />
          </div>
        </div>
      </div>
    );
  }
}
