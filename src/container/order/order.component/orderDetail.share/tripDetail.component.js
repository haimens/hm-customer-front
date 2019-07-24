import React, { Component } from "react";
import { GMapLocation } from "../../../../components/shared";
import VehicleCard from "./vehicle.card";
import { convertUTCtoLocal, parseAmount } from "../../../../actions/utilities.action";

export default class TripDetail extends Component {
  state = {
    selected: ""
  };
  handleOnButtonSelected = quote_token => {
    this.setState({ selected: quote_token });
    this.props.handleOnButtonSelected(quote_token);
  };
  render() {
    const { trip, num, hideVehicleCard } = this.props;
    const { basic_info, quote_list, showMap } = trip;
    const { selected } = this.state;
    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-between border-bottom" style={{ height: "86px" }}>
          <h3 className="mt-3 hm-main-textColor hm-text-22 font-weight-bold">Trip {num}</h3>
          <h3 className="mt-3">
            <span className="text-grey hm-text-22 font-weight-bold">
              Trip {num} Subtotal: {parseAmount(basic_info.amount, 2)}
            </span>
          </h3>
        </div>
        <div className="row mt-4">
          <div className="col-6">
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
          {!hideVehicleCard && (
            <div className="col-6" style={{ height: "264px" }}>
              {quote_list.length > 0 &&
                quote_list.map((quote, index) => (
                  <VehicleCard
                    clicked={selected}
                    key={index}
                    quote={quote}
                    onButtonSelected={() => this.handleOnButtonSelected(quote.quote_token)}
                  />
                ))}
            </div>
          )}
          <div className="col-6 ">
            <div className="mt-4">
              <div className="text-grey hm-main-text-14 font-weight-500">Pickup Date/Time</div>
              <div className="text-main-textColor hm-main-text-14 font-weight-bold">
                {convertUTCtoLocal(basic_info.pickup_time)}
              </div>
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
          </div>
        </div>
      </div>
    );
  }
}
