import React, { Component } from "react";
import Nav from "../../components/nav/Nav.component";
import "./Dashboard.css";
import { connect } from "react-redux";
import moment from "moment";
import { DatePicker, TimePicker } from "antd";
import GAutoComplete from "../../components/shared/GAutoComplete";
import { saveDate, saveTime, savePassenger } from "../../actions/location.action";
import MainCard from "../../components/shared/MainCard";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickup: "",
      dropoff: "",
      date: "",
      time: ""
    };
  }

  _getAddress = type => address => {
    console.log(type);
  };

  onDateChange = date => {
    console.log(date);
  };

  onTimeChange = date => {
    console.log(date);
  };

  render() {
    console.log(this.props);
    return (
      <main>
        <section className="header-container">
          <img src={`${process.env.PUBLIC_URL}/img/haimensMain.png`} alt="main-bg" style={{ width: "100%" }} />
          <Nav outerClass={"main-nav"} />
          <div className="container-fluid main-info">
            <div className="row">
              <div className="col col-6">
                <h1 className="text-white header-text">Pickup & Go</h1>
              </div>

              <div className="col col-6 ">
                <div className="col-9 dashboard-form rounded p-4">
                  <h3 className="haimens-main-textColor font-weight-bold ">BOOK A TRIP NOW</h3>
                  <div className="mt-4">
                    <GAutoComplete placeholder={"PICKUP"} />
                  </div>
                  <div className="mt-3">
                    <GAutoComplete placeholder={"DROPOFF"} />
                  </div>

                  <div className="mt-3 d-flex">
                    <div className="row">
                      <div className="d-flex col-6">
                        <span className="input-group-text bg-white border-right-0 main-addon">
                          <i className="far fa-calendar-times addon-color" />
                        </span>
                        <DatePicker onChange={this.onDateChange} id="date" size="large" placeholder={"DATE"} />
                      </div>
                      <div className="d-flex col-6">
                        <span className="input-group-text bg-white border-right-0 main-addon">
                          <i className="far fa-clock addon-color time-clock" />
                        </span>
                        <TimePicker
                          onChange={this.onTimeChange}
                          defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                          placeholder={"TIME"}
                          size="large"
                          id="time"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 d-flex">
                    <span className="input-group-text bg-white border-right-0 main-addon">
                      <i className="far fa-user addon-color" />
                    </span>
                    <input
                      className="form-control passenger-input font-weight-bold haimens-main-text-14 border-left-0"
                      placeholder="PASSENGER"
                      type="number"
                    />
                  </div>

                  <div className="mt-3">
                    <button type="button" className="btn p-2 text-white w-100 haimens-main-bgColor">
                      GET PRICE QUOTE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h1 className="haimens-main-textColor header-text-sub mt-2">Why choose us</h1>
          <div className="mt-3">
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <MainCard />
                </div>
                <div className="col-4">
                  <MainCard />
                </div>
                <div className="col-4">
                  <MainCard />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    pickup_location: state.locationReducer.pickup_location,
    dropoff_location: state.locationReducer.dropoff_location
  };
};

const mapDispatchToProps = dispatch => {
  return { saveDate, saveTime, savePassenger };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
