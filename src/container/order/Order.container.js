import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Order.container.css";
import OrderPagination from "./order.component/OrderPagination.component";
import OrderDetail from "./order.component/OrderDetail.component";
import { saveDate, saveTime, savePassenger } from "../../actions/location.action";
import moment from "moment";

class Order extends Component {
  state = {
    position: 0
  };

  componentDidMount() {
    console.log(this.props);
  }

  onDateChange = date => {
    console.log(moment(date).format("LL"));
  };

  onTimeChange = time => {
    console.log(moment(time).format("hh:mm a"));
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
          <OrderDetail parentProps={this.props} onDateChange={this.onDateChange} onTimeChange={this.onTimeChange} />
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

const mapDispatchToProps = { saveDate, saveTime, savePassenger };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Order));
