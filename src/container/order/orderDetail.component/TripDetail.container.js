import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GMapLocation } from "../../../components/shared";
import { convertUTCtoLocal, parseAmount } from "../../../actions/utilities.action";
import { getTripDetail } from "../../../actions/order.action";

class TripDetail extends Component {
  state = {
    selected: "",
    selected_amount: ""
  };
  async componentDidMount() {
    const { getTripDetail, trip } = this.props;
    if (trip.basic_info.trip_token) {
      await getTripDetail(trip.basic_info.trip_token);
    }
  }
  render() {
    const { trip, num, hideEditButton, trip_detail_in_customer } = this.props;
    const { basic_info, showMap } = trip;
    const { selected_amount } = this.state;
    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-between border-bottom" style={{ height: "86px" }}>
          <h3 className="mt-3 hm-main-textColor hm-text-22 font-weight-bold">Trip {num}</h3>
          <h3 className="mt-3">
            <span className="text-grey hm-text-22 font-weight-bold">
              Trip {num} Subtotal: {parseAmount(basic_info.amount || selected_amount, 2)}
            </span>
          </h3>
        </div>
        <div className="row">
          <div className="col-md-6 col-12  mt-4">
            {showMap && (
              <div style={{ height: "230px" }}>
                <GMapLocation
                  position={{
                    center: {
                      lat: basic_info.from_lat,
                      lng: basic_info.from_lng
                    },
                    origin: {
                      lat: basic_info.from_lat,
                      lng: basic_info.from_lng
                    },
                    destination: {
                      lat: basic_info.to_lat,
                      lng: basic_info.to_lng
                    }
                  }}
                />
              </div>
            )}
          </div>
          <div className="col-md-6 col-12  mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-grey hm-main-text-14 font-weight-500">Pickup Date/Time</div>
              {!hideEditButton && (
                <img
                  src={`${process.env.PUBLIC_URL}/img/icon_edit.svg`}
                  className="hm-pointer-cursor"
                  alt="icon"
                  onClick={this.handleEditTripDetail}
                />
              )}
            </div>
            <div className="text-main-textColor hm-main-text-14 font-weight-bold">
              {convertUTCtoLocal(basic_info.pickup_time)}
            </div>
            <div className="mt-4">
              <div className="text-grey hm-main-text-14 font-weight-500">Pickup Location</div>
              <div className="text-main-textColor hm-main-text-14 font-weight-bold">
                {basic_info.from_formatted || basic_info.from_addr_str}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-grey hm-main-text-14 font-weight-500">Dropoff Location</div>
              <div className="text-main-textColor hm-main-text-14 font-weight-bold">
                {basic_info.to_formatted || basic_info.to_addr_str}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-grey hm-main-text-14 font-weight-500">Status</div>
              <div className="text-main-textColor hm-main-text-14 font-weight-bold">
                <i
                  className="fas fa-circle success-text-color mr-3 pl-0"
                  style={{ fontSize: "6px", color: "#2ece89" }}
                />
                {basic_info.status_str}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-grey hm-main-text-14 font-weight-500">Driver</div>
              <div className="text-main-textColor hm-main-text-14 font-weight-bold d-flex align-items-center mt-1">
                <img
                  src={trip_detail_in_customer.driver_info && trip_detail_in_customer.driver_info.img_path}
                  alt=""
                  className="rounded-circle mr-3"
                  style={{ height: "40px", width: "40px" }}
                />
                {trip_detail_in_customer.driver_info && trip_detail_in_customer.driver_info.name}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-grey hm-main-text-14 font-weight-500">Vehicle</div>
              <div className="text-main-textColor hm-main-text-14 font-weight-bold d-flex align-items-center mt-1">
                <img
                  src={trip_detail_in_customer.car_info && trip_detail_in_customer.car_info.img_path}
                  alt=""
                  className="rounded-circle mr-3"
                  style={{ height: "40px", width: "40px" }}
                />
                <div>
                  <div>{trip_detail_in_customer.car_info && trip_detail_in_customer.car_info.identifier}</div>
                  <div>{trip_detail_in_customer.car_info && trip_detail_in_customer.car_info.plate_num}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    trip_detail_in_customer: state.orderReducer.trip_detail_in_customer
  };
};

const mapDispatchToProps = {
  getTripDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripDetail));
