import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import GAutoComplete from "../../../../components/shared/GAutoComplete";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import { convertLocalToUTC } from "../../../../actions/utilities.action";
export default class UpdateModal extends Component {
  state = {
    date: "",
    time: "",
    pickup_location: "",
    dropoff_location: ""
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleClose = () => {
    this.props.onClose();
  };
  handleDatePicker = date => {
    this.props.getDate(date);
  };

  getPickupLocation = address => {
    this.setState({ pickup_location: document.getElementById("edit_pickup").value });
  };
  getDropOffLocation = address => {
    this.setState({ dropoff_location: document.getElementById("edit_dropoff").value });
  };
  handleDatePicker = date => {
    this.setState({ date });
  };
  handleTimePicker = time => {
    this.setState({ time });
  };

  handleUpdateTrip = async () => {
    const { date, time, pickup_location, dropoff_location } = this.state;
    if (date !== "" && time !== "" && pickup_location !== "" && dropoff_location !== "") {
      if (this.props.num === 1) {
        this.props.setFirstMapToFalse();

        this.props.findOrderLocationPrice({
          from_address_str: pickup_location,
          to_address_str: dropoff_location,
          pickup_time: convertLocalToUTC(`${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm:ss")}`),
          pickup_time_local: `${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm:ss")}`
        });
        this.props.saveFirstTripLocally({
          from_address_str: pickup_location,
          to_address_str: dropoff_location,
          pickup_time: convertLocalToUTC(
            moment(`${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm:ss")}`)
          ),
          pickup_time_local: `${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm:ss")}`,
          flight_str: this.props.trip.flight_str
        });
      } else {
        this.props.setSecondMapToFalse();

        this.props.findOrderLocationPriceAgain({
          from_address_str: pickup_location,
          to_address_str: dropoff_location,
          pickup_time: convertLocalToUTC(
            moment(`${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm:ss")}`)
          ),
          pickup_time_local: `${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm:ss")}`
        });
        this.props.saveSecondTripLocally({
          from_address_str: pickup_location,
          to_address_str: dropoff_location,
          pickup_time: convertLocalToUTC(
            moment(`${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm:ss")}`)
          ),
          pickup_time_local: `${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm:ss")}`,
          flight_str: this.props.trip.flight_str
        });
      }
    }
    this.handleClose();
  };

  async componentDidMount() {
    const { pickup_time, from_address_str, to_address_str } = this.props.trip;
    await this.setState({
      date: moment(pickup_time),
      time: moment(pickup_time),
      pickup_location: from_address_str,
      dropoff_location: to_address_str
    });
  }

  render() {
    const { date, time, pickup_location, dropoff_location } = this.state;
    return (
      <Modal
        title={`Update Trip ${this.props.num}`}
        onClose={this.handleClose}
        position="center"
        getWidth={"467px"}
        getHeight={"620px"}
      >
        <div className="container">
          <div className="col-12 my-4">
            <label className="font-weight-bold hm-main-textColor-sub hm-main-text-14" htmlFor="pickup_location">
              Pickup Location
            </label>
            <div className="border rounded p-1">
              <GAutoComplete
                giveId="edit_pickup"
                defaultValue={pickup_location}
                placeholder={"Pickup Location"}
                getAddress={this.getPickupLocation}
                inputClass={"border-left-0"}
              />
            </div>
          </div>
          <div className="col-12 mb-4">
            <label className="font-weight-bold hm-main-textColor-sub hm-main-text-14" htmlFor="dropoff_location">
              Dropoff Location
            </label>
            <div className="border rounded p-1">
              <GAutoComplete
                giveId="edit_dropoff"
                defaultValue={dropoff_location}
                getAddress={this.getDropOffLocation}
                placeholder={"Dropoff Location"}
                inputClass={"border-left-0"}
              />
            </div>
          </div>
          <div className=" col-12 mb-4">
            <label className="font-weight-bold hm-main-textColor-sub hm-main-text-14" htmlFor="pickup_date">
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
          <div className=" col-12 my-4">
            <label className="font-weight-bold hm-main-textColor-sub hm-main-text-14" htmlFor="pickup_time">
              Time
            </label>
            <div className="border rounded p-1">
              <TimePicker value={time} onChange={this.handleTimePicker} size="large" format="HH:mm" id="time" />
            </div>
          </div>
          <div className="form-group text-right pt-3">
            <button className="bg-purple btn button-main-size px-4 text-white mr-3" onClick={this.handleUpdateTrip}>
              Update
            </button>
            <button onClick={this.handleClose} className="btn button-main-size btn-outline-secondary px-4">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
