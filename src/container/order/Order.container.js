import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Order.container.css";
import OrderPagination from "./order.component/OrderPagination.component";
import GAutoComplete from "../../components/shared/GAutoComplete";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";

class Order extends Component {
  state = {
    position: 0
  };
  render() {
    return (
      <section>
        <div className="col-10 mx-auto order-header-margin">
          <OrderPagination position={this.state.position} />
        </div>
        <hr className="haimens-main-bgColor" />
        <div className="col-10 mx-auto my-5">
          <h3>Trip Detail</h3>
          <div className="row">
            <div className="col-6">
              <label className="account-marginTop font-weight-bold" for="email">
                Pickup Location
              </label>
              <GAutoComplete placeholder={"PICKUP"} />
            </div>
            <div className="col-6">
              <label className="account-marginTop font-weight-bold" for="email">
                Dropoff Location
              </label>
              <GAutoComplete placeholder={"DROPOFF"} />
            </div>
            <div className="col-3">
              <label className="account-marginTop font-weight-bold" for="email">
                Date
              </label>
              <DatePicker
                onChange={this.onDateChange}
                disabledDate={this.disabledDate}
                id="date"
                size="large"
                placeholder={""}
              />
            </div>
            <div className="col-3">
              <label className="account-marginTop font-weight-bold" for="email">
                Time
              </label>
              <TimePicker
                onChange={this.onTimeChange}
                defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                placeholder={""}
                size="large"
                id="time"
              />
            </div>
            <div className="col-3">
              <label className="account-marginTop font-weight-bold" for="email">
                Passenger
              </label>
              <input type="number" id="email" class="form-control haimens-input-height" />
            </div>
            <div className="col-3">
              <label className="account-marginTop font-weight-bold" for="email">
                Flight Number
              </label>
              <input type="text" id="email" class="form-control haimens-input-height" />
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

export default connect(
  mapStateToProps,
  null
)(withRouter(Order));
