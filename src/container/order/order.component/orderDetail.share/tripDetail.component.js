import React, { Component } from "react";
import { GMapLocation } from "../../../../components/shared";
import VehicleCard from "./vehicle.card";
import { convertUTCtoLocal, parseAmount } from "../../../../actions/utilities.action";
export default class TripDetail extends Component {
  state = {
    selected: "",
    selected_amount: ""
  };
  handleOnButtonSelected = quote => {
    this.setState({ selected: quote.quote_token, selected_amount: quote.amount });
    this.props.handleOnButtonSelected(quote.quote_token);
  };

  handleEditTripDetail = () => {
    this.props.handleEditTripDetail(this.props.num);
  };

  render() {
    const { trip, num, hideVehicleCard, hideEditButton } = this.props;
    const { basic_info, quote_list, showMap } = trip;
    const { selected, selected_amount } = this.state;
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
          {!hideVehicleCard && (
            <div className="col-md-6 col-12  mt-4" style={{ maxHeight: "264px" }}>
              {quote_list.length > 0 &&
                quote_list.map((quote, index) => (
                  <VehicleCard
                    clicked={selected}
                    key={index}
                    quote={quote}
                    onButtonSelected={() => this.handleOnButtonSelected(quote)}
                  />
                ))}
            </div>
          )}
          <div className="col-md-6 col-12">
            <div className="mt-4">
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
