import React, { Component } from "react";
import { GMapLocation } from "../../../../components/shared";
import VehicleCard from "./vehicle.card";

export default class TripDetail extends Component {
  render() {
    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-between border-bottom" style={{ height: "86px" }}>
          <h3 className="mt-3 hm-main-textColor hm-text-22 font-weight-bold">Trip 1</h3>
          <h3 className="mt-3">
            <span className="text-grey hm-text-22 font-weight-bold">Trip 1 Subtotal:</span>
          </h3>
        </div>
        <div className="row mt-4">
          <div className="col-6">
            <div style={{ height: "230px" }}>
              <GMapLocation
                position={{
                  center: {
                    lat: 0,
                    lng: 0
                  },
                  origin: {
                    lat: 10,
                    lng: 10
                  },
                  destination: {
                    lat: 0,
                    lng: 0
                  }
                }}
              />
            </div>
          </div>
          <div className="col-6" style={{ height: "264px" }}>
            <VehicleCard />
          </div>
          <div className="col-6 ">
            <div className="mt-4">
              <div className="text-grey hm-main-text-14 font-weight-500">Pickup Date/Time</div>
              <div className="text-main-textColor hm-main-text-14 font-weight-bold">Pickup Date/Time</div>
            </div>
            <div className="mt-4">
              <div className="text-grey hm-main-text-14 font-weight-500">Pickup Location</div>
              <div className="text-main-textColor hm-main-text-14 font-weight-bold">Pickup Date/Time</div>
            </div>
            <div className="mt-4">
              <div className="text-grey hm-main-text-14 font-weight-500">Dropoff Location</div>
              <div className="text-main-textColor hm-main-text-14 font-weight-bold">Pickup Date/Time</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
