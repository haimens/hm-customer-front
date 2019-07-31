import React, { Component } from "react";
import { DatePicker, TimePicker } from "antd";
import GAutoComplete from "../../../../components/shared/GAutoComplete";
import { convertLocalToUTC } from "../../../../actions/utilities.action";
import FlightDetailModal from "./FlightDetail.modal";
import alertify from "alertifyjs";
import moment from "moment";
export default class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roundTrip: false,
      showFlightDetail: false
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

  handleInputChange = async e => {
    const { id, value } = e.target;
    if (id === "airline_code") {
      await this.props.getAirlineCode(value);
    }
    if (id === "flight_number") {
      await this.props.getFlightNumber(value);
    }
  };

  handleSearchFlight = async () => {
    const { findFlightListInLord, trip, flight_number, airline_code } = this.props;
    if (trip.time !== "" && trip.date !== "" && flight_number !== "" && airline_code !== "") {
      await findFlightListInLord({
        date: convertLocalToUTC(`${moment(trip.date).format("YYYY-MM-DD")} ${moment(trip.time).format("HH:mm:ss")}`),
        airlineCode: airline_code,
        flightNumber: flight_number
      });
      await this.setState({ showFlightDetail: true });
    } else {
      alertify.alert("Error!", "Please Finished Date, Air Line Code, and Flight Number before search!");
    }
  };

  handleFlightDetailBeenClicked = async () => {
    await this.setState({ showFlightDetail: false });
  };

  componentDidMount() {}

  render() {
    const { showFlightDetail } = this.state;
    const { airline_code, flight_number, trip, flight_list_in_lord } = this.props;
    const { date, time, pickup_location, dropoff_location } = trip;
    return (
      <div className="row border-top mb-5">
        {showFlightDetail && (
          <FlightDetailModal
            hideButton={true}
            onClose={this.handleFlightDetailBeenClicked}
            flight_list_in_lord={flight_list_in_lord}
          />
        )}
        <div className="col-lg-6 col-12 mt-5">
          <label className="font-weight-bold hm-main-textColor-sub hm-main-text-14" htmlFor="pickup_location">
            Pickup Location
          </label>
          <div className="border rounded p-1">
            <GAutoComplete
              giveId={this.props.pickup_giveId}
              defaultValue={pickup_location}
              placeholder={"Pickup Location"}
              getAddress={this.getPickupLocation}
              inputClass={"border-left-0"}
            />
          </div>
        </div>
        <div className="col-lg-6 col-12 mt-5">
          <label className="font-weight-bold hm-main-textColor-sub hm-main-text-14" htmlFor="dropoff_location">
            Dropoff Location
          </label>
          <div className="border rounded p-1">
            <GAutoComplete
              giveId={this.props.dropoff_giveId}
              defaultValue={dropoff_location}
              getAddress={this.getDropOffLocation}
              placeholder={"Dropoff Location"}
              inputClass={"border-left-0"}
            />
          </div>
        </div>
        <div className="col-lg-3 col-12 mt-4">
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
              inputReadOnly={true}
            />
          </div>
        </div>
        <div className="col-lg-3 col-12 mt-4">
          <label className="font-weight-bold hm-main-textColor-sub hm-main-text-14" htmlFor="pickup_time">
            Time
          </label>
          <div className="border rounded p-1">
            <TimePicker
              use12Hours={true}
              inputReadOnly={true}
              value={time}
              onChange={this.handleTimePicker}
              size="large"
              format="HH:mm"
              id="time"
            />
          </div>
        </div>
        <div className="col-lg-6 col-12 mt-4">
          <label
            className="font-weight-bold hm-main-textColor-sub hm-main-text-14 d-flex align-items-center"
            htmlFor="flight"
          >
            Flight Number
            <div className="btn-group dropup">
              <button
                type="button"
                className="dropdown-toggle removeAfter"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ border: "none", outline: "none" }}
              >
                <i className="far fa-question-circle" style={{ fontSize: "16px", color: "#aeb5bd" }} />
              </button>
              <div
                className="dropdown-menu hm-main-text-12 border-0 shadow hm-main-textColor-sub p-3 triangle-bottom"
                style={{ width: "260px" }}
              >
                Airline code is the operating airline code, ex. UA. Flight number refers to the numeric part of a flight
                code. If you are not sure,
                <a
                  className="hm-main-text-12"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.iata.org/publications/Pages/code-search.aspx"
                >
                  search here.
                </a>
              </div>
            </div>
          </label>

          <div className="d-flex ">
            <div className="border rounded p-1 w-100 col-4">
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
            <div className="border rounded p-1 w-100 offset-1 col-4">
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

            <div className=" rounded p-1 w-100 col-3 ">
              <div className="input-group d-flex justify-content-end">
                <i
                  className="fas fa-search d-flex justify-content-center align-items-center rounded-circle bg-purple text-white hm-pointer-cursor ml-3"
                  style={{ height: "46px", width: "46px" }}
                  onClick={this.handleSearchFlight}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
