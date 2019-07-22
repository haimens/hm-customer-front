import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
import alertify from "alertifyjs";
import moment from "moment";

import "./Dashboard.container.css";

import GAutoComplete from "../../components/shared/GAutoComplete";
import Nav from "../../components/nav/Nav.component";
import { saveDate, saveTime, savePassenger } from "../../actions/location.action";
import MainCard from "../../components/shared/MainCard";
import Footer from "../../components/nav/Footer.component";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: "",
      passenger: 1
    };
  }

  onDateChange = date => {
    this.setState({ date: moment(date) });
  };

  onTimeChange = time => {
    this.setState({ time: moment(time) });
  };

  handlePassengerChange = e => {
    this.setState({ passenger: e.target.value });
  };

  handleSubmitOrder = async () => {
    const { pickup_location, dropoff_location } = this.props;
    const { date, time, passenger } = this.state;
    if (date && time && passenger && pickup_location[0].formatted_address && dropoff_location[0].formatted_address) {
      if (passenger > 0) {
        await this.props.saveDate(date);
        await this.props.saveTime(time);
        await this.props.savePassenger(passenger);
        await this.props.history.push("/order");
      } else {
        alertify.alert("Something Wrong", "Please Submit Correct Passenger Amount!");
      }
    } else {
      alertify.alert("Something Wrong", "Please Finished the Form Before Submit!");
    }
  };

  disabledDate(current) {
    // Can not select days before today and today
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return current && current.valueOf() < date;
  }

  render() {
    return (
      <main>
        <section className="header-container">
          <img
            src={`${process.env.PUBLIC_URL}/img/haimensMain.jpg`}
            alt="main-bg"
            style={{ width: "100%", height: "967px" }}
          />
          <Nav outerClass={"main-nav"} outlineButton={`hm-main-button-outline`} />
          <div className="container-fluid main-info">
            <div className="row">
              <div className="col-md-6 d-none d-lg-block">
                <h1 className="hm-main-textColor header-text">Shuttle Service Made Easier</h1>
              </div>

              <div className="col-sm-12 col-lg-6">
                <div className="col-lg-9 col-12 dashboard-form bg-white px-0">
                  <div className="d-flex justify-content-center align-items-center dashboard-form-header">
                    <h3 className="hm-main-textColor font-weight-bold ">BOOK A TRIP NOW</h3>
                  </div>
                  <div className="col-12">
                    <div className="mt-4">
                      <GAutoComplete placeholder={"PICKUP"} />
                    </div>
                    <hr />
                    <div className="mb-3">
                      <GAutoComplete placeholder={"DROPOFF"} />
                    </div>
                    <hr />

                    <div className="mb-3">
                      <DatePicker
                        onChange={this.onDateChange}
                        disabledDate={this.disabledDate}
                        id="date"
                        placeholder={"Date"}
                      />
                    </div>
                    <hr />
                    <div className="mb-3">
                      <TimePicker
                        onChange={this.onTimeChange}
                        defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                        placeholder={"Time"}
                        format="HH:mm"
                        id="time"
                      />
                    </div>
                    <hr />
                    <div className="mt-4">
                      <button
                        type="button"
                        className="btn mt-2 text-white w-100 bg-purple price-button"
                        onClick={this.handleSubmitOrder}
                      >
                        GET PRICE QUOTE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <h1 className="hm-main-textColor header-text-sub my-2">Why choose us</h1>
          </div>
          <div className="card-margin-top card-margin-fix-bottom-sub">
            <div className="container">
              <div className="row ">
                <div className="col-12 col-md-6">
                  <MainCard
                    img={"haimensMain.png"}
                    title={"TO AIRPORT: ON TIME GUARANTEED PICKUP"}
                    paragraph={
                      "We Guarantee the driver will come to pick you up within the specified time frame for your airport drop off."
                    }
                  />
                </div>
                <div className="col-12 col-md-6">
                  <MainCard
                    img={"haimensMain.png"}
                    title={"FROM AIRPORT: LESS WAIT TIME AT THE CURB"}
                    paragraph={"90% of our customers wait 10 minutes or less at the curb."}
                  />
                </div>
              </div>
              <div className="row card-margin-fix-sub">
                <div className="col-12 col-md-6">
                  <MainCard
                    img={"haimensMain.png"}
                    title={"PHONE SUPPORT"}
                    paragraph={"Feel free to call us for any question you may have before, on or after the trip."}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <MainCard
                    img={"haimensMain.png"}
                    title={"HOURLY CHARTER"}
                    paragraph={
                      "Our Customer directed hourly charter service puts a chauffeur at your disposal for as long as you desire."
                    }
                  />
                </div>
              </div>
              <div className="row card-margin-fix-sub">
                <div className="col-12 col-md-6">
                  <MainCard
                    img={"haimensMain.png"}
                    title={"QUALITY"}
                    paragraph={"Clean, comfortable, and safe vehicles that meet your travel needs."}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <MainCard
                    img={"haimensMain.png"}
                    title={"PROFESSIONAL DRIVERS"}
                    paragraph={
                      "Experienced, Friendly, and service oriented drivers are ready to serve you in higher standard."
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    pickup_location: state.locationReducer.firstTrip.pickup_location,
    dropoff_location: state.locationReducer.firstTrip.dropoff_location
  };
};

const mapDispatchToProps = { saveDate, saveTime, savePassenger };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
