import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Order.container.css";
import OrderPagination from "./order.component/OrderPagination.component";
import OrderFirstStep from "./order.component/OrderFirstStep.component";
import { saveDate, saveTime, savePassenger } from "../../actions/location.action";
import moment from "moment";

class Order extends Component {
  state = {
    position: 0,
    roundedTrip: false
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

  handleTripType = async () => {
    await this.setState(states => ({ roundedTrip: !states.roundedTrip }));
  };

  render() {
    const { position, roundedTrip } = this.state;
    return (
      <section>
        <div className="col-10 mx-auto order-header-margin">
          <OrderPagination position={position} />
        </div>
        <hr className="haimens-main-bgColor" />
        <div className="col-10 mx-auto my-5">
          <h3>Trip Detail</h3>
          {position === 0 ? (
            <OrderFirstStep
              pickup={"PICKUP"}
              dropoff={"DROPOFF"}
              parentProps={this.props}
              onDateChange={this.onDateChange}
              onTimeChange={this.onTimeChange}
            />
          ) : (
            ""
          )}

          {roundedTrip ? (
            <div>
              <hr style={{ marginTop: "70px" }} />
              <OrderFirstStep
                pickup={"PICKUP"}
                dropoff={"DROPOFF"}
                parentProps={this.props}
                onDateChange={this.onDateChange}
                onTimeChange={this.onTimeChange}
              />
            </div>
          ) : (
            ""
          )}
          <div className="row py-5">
            <div className="col-4">
              <button
                type="button"
                className="btn haimens-main-button-outline w-100 haimens-input-height"
                onClick={this.handleTripType}
              >
                {roundedTrip ? "One Way" : "Round Trip"}
              </button>
            </div>
            <div className="col-4">
              <button type="button" className="btn haimens-button-bgColor-sub text-white w-100 haimens-input-height">
                Contact Sales
              </button>
            </div>
            <div className="col-4">
              <button type="button" className="btn haimens-main-bgColor text-white w-100 haimens-input-height">
                Get Price
              </button>
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

const mapDispatchToProps = { saveDate, saveTime, savePassenger };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Order));
