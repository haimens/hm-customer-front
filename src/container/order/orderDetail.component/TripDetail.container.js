import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GMapLocation } from "../../../components/shared";
import { convertUTCtoLocal, parseAmount } from "../../../actions/utilities.action";
import { getTripDetail } from "../../../actions/order.action";

class TripDetail extends Component {
  async componentDidMount() {
    const { getTripDetail, trip } = this.props;
    if (trip.basic_info.trip_token) {
      await getTripDetail(trip.basic_info.trip_token);
    }
  }
  render() {
    const { trip, num, trip_detail_in_customer } = this.props;
    const { basic_info, showMap } = trip;
    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-between border-bottom" style={{ height: "86px" }}>
          <h3 className="mt-3 hm-main-textColor hm-text-22 font-weight-bold">Trip {num}</h3>
          <h3 className="mt-3">
            <div className="text-grey hm-text-22 font-weight-bold">
              <span className="text-grey hm-text-22 font-weight-bold d-none d-lg-inline-flex">
                Trip {num}
                Subtotal:
              </span>
              {parseAmount(basic_info.amount, 2)}
            </div>
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
        <section className="mb-4">
          <div
            className="d-flex align-items-center justify-content-between border-bottom mb-4"
            style={{ height: "86px" }}
          >
            <h3 className="mt-3 hm-main-textColor hm-text-22 font-weight-bold">Timeline</h3>
          </div>
          <div className="row">
            <div className="col-lg-3 mt-4 mt-md-0 col-md-6 col-12 d-flex justify-content-center align-items-center flex-column">
              <img
                src={`${process.env.PUBLIC_URL}/img/start.svg`}
                alt="timeline"
                style={{ height: "41px", width: "51px" }}
              />
              <div className="text-secondary-color hm-text-14 font-weight-500 mt-4">Driver Start Trip</div>
              <div className="text-modal-color hm-text-14 font-weight-500 mt-2">
                {trip_detail_in_customer.basic_info && trip_detail_in_customer.basic_info.start_time
                  ? convertUTCtoLocal(trip_detail_in_customer.basic_info.start_time)
                  : "N/A"}
              </div>
            </div>
            <div className="col-lg-3 mt-4 mt-md-0 col-md-6 col-12 d-flex justify-content-center align-items-center flex-column">
              <img
                src={`${process.env.PUBLIC_URL}/img/pickup.svg`}
                alt="timeline"
                style={{ height: "41px", width: "51px" }}
              />
              <div className="text-secondary-color hm-text-14 font-weight-500 mt-4">Driver Arrival Pickup Location</div>
              <div className="text-modal-color hm-text-14 font-weight-500 mt-2">
                {trip_detail_in_customer.basic_info && trip_detail_in_customer.basic_info.eta_time
                  ? convertUTCtoLocal(trip_detail_in_customer.basic_info.eta_time)
                  : "N/A"}
              </div>
            </div>
            <div className="col-lg-3 mt-4 mt-md-0 col-md-6 col-12 d-flex justify-content-center align-items-center flex-column">
              <img
                src={`${process.env.PUBLIC_URL}/img/ongoing.svg`}
                alt="timeline"
                style={{ height: "41px", width: "51px" }}
              />
              <div className="text-secondary-color hm-text-14 font-weight-500 mt-4">Customer On Board</div>
              <div className="text-modal-color hm-text-14 font-weight-500 mt-2">
                {trip_detail_in_customer.basic_info && trip_detail_in_customer.basic_info.cob_time
                  ? convertUTCtoLocal(trip_detail_in_customer.basic_info.cob_time)
                  : "N/A"}
              </div>
            </div>
            <div className="col-lg-3 mt-4 mt-md-0 col-md-6 col-12 d-flex justify-content-center align-items-center flex-column">
              <img
                src={`${process.env.PUBLIC_URL}/img/finish.svg`}
                alt="timeline"
                style={{ height: "41px", width: "51px" }}
              />
              <div className="text-secondary-color hm-text-14 font-weight-500 mt-4">Customer Arrival Destination</div>
              <div className="text-modal-color hm-text-14 font-weight-500 mt-2">
                {trip_detail_in_customer.basic_info && trip_detail_in_customer.basic_info.arrive_time
                  ? convertUTCtoLocal(trip_detail_in_customer.basic_info.arrive_time)
                  : "N/A"}
              </div>
            </div>
          </div>
        </section>
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
