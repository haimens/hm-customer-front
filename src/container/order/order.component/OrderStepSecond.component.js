import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import alertify from "alertifyjs";
import OrderMapDetail from "./OrderMapDetail.component";
import {
  saveDate,
  saveTime,
  savePassenger,
  saveDateAgain,
  saveTimeAgain,
  savePassengerAgain,
  saveFlight,
  saveFlightAgain
} from "../../../actions/location.action";

class OrderStepSecond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickup_location: "",
      dropoff_location: "",
      pickup_date: "",
      pickup_time: "",
      passenger_amount: 1,

      pickup_location_again: "",
      dropoff_location_again: "",
      pickup_date_again: "",
      pickup_time_again: "",
      passenger_amount_again: 1,
      flight: "",
      roundTrip: false
    };
  }

  componentDidMount() {
    if (this.props.pickup_location_again.location !== "") {
      this.setState({ roundTrip: true });
    }
  }

  render() {
    const { roundTrip } = this.state;
    const {
      pickup_location,
      dropoff_location,
      pickup_date,
      pickup_time,
      passenger_amount,
      pickup_location_again,
      dropoff_location_again,
      pickup_date_again,
      pickup_time_again,
      passenger_amount_again
    } = this.props;
    return (
      <section className="pt-4 pb-4">
        <div className="col-10 mx-auto">
          <OrderMapDetail
            trip={1}
            parentProps={{ pickup_location, dropoff_location, pickup_date, pickup_time, passenger_amount }}
          />
          {roundTrip && (
            <OrderMapDetail
              trip={2}
              parentProps={{
                pickup_location: pickup_location_again,
                dropoff_location: dropoff_location_again,
                pickup_date: pickup_date_again,
                pickup_time: pickup_time_again,
                passenger_amount: passenger_amount_again
              }}
            />
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    pickup_location: state.locationReducer.pickup_location,
    dropoff_location: state.locationReducer.dropoff_location,
    pickup_location_again: state.locationReducer.pickup_location_again,
    dropoff_location_again: state.locationReducer.dropoff_location_again,
    pickup_date: state.locationReducer.pickup_date,
    pickup_time: state.locationReducer.pickup_time,
    passenger_amount: state.locationReducer.passenger_amount,
    pickup_date_again: state.locationReducer.pickup_date_again,
    pickup_time_again: state.locationReducer.pickup_time_again,
    passenger_amount_again: state.locationReducer.passenger_amount_again
  };
};

const mapDispatchToProps = {
  saveDate,
  saveTime,
  savePassenger,
  saveDateAgain,
  saveTimeAgain,
  savePassengerAgain,
  saveFlight,
  saveFlightAgain
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderStepSecond));
