import React from "react";
import { convertUTCtoLocal } from "../../actions/utilities.action";

export default function Flight(props) {
  return (
    <div className="col-12 border-bottom p-4">
      <div className="row mb-3">
        <div className="col-6">
          <div className="row">
            <div className="col-6 hm-text-12 text-main-color font-weight-500 ">Departure date</div>
            <div className="col-6 hm-text-12 text-modal-color font-weight-bold">
              {convertUTCtoLocal(props.flight.dep_date)}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-6 hm-text-12 text-main-color font-weight-500 ">Arrival date</div>
            <div className="col-6 hm-text-12 text-modal-color font-weight-bold">
              {convertUTCtoLocal(props.flight.arr_date)}
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <div className="row">
            <div className="col-6 hm-text-12 text-main-color font-weight-500 ">Departure airport</div>
            <div className="col-6 hm-text-12 text-modal-color font-weight-bold ">{props.flight.dep_airport}</div>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-6 hm-text-12 text-main-color font-weight-500 ">Arrival airport</div>
            <div className="col-6 hm-text-12 text-modal-color font-weight-bold">{props.flight.arr_airport}</div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <div className="row">
            <div className="col-6 hm-text-12 text-main-color font-weight-500 ">Departure terminal</div>
            <div className="col-6 hm-text-12 text-modal-color font-weight-bold">{props.flight.dep_terminal}</div>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-6 hm-text-12 text-main-color font-weight-500 ">Arrival terminal</div>
            <div className="col-6 hm-text-12 text-modal-color font-weight-bold">{props.flight.arr_terminal}</div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <div className="row">
            <div className="col-6 hm-text-12 text-main-color font-weight-500 ">Carrier code</div>
            <div className="col-6 hm-text-12 text-modal-color font-weight-bold">{props.flight.carrier_code}</div>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-6 hm-text-12 text-main-color font-weight-500 ">Flight number</div>
            <div className="col-6 hm-text-12 text-modal-color font-weight-bold">{props.flight.flight_num}</div>
          </div>
        </div>
      </div>
      {!props.hideButton && (
        <div className="d-flex justify-content-end">
          <button
            className="btn rounded-custom text-white button-main-background shadow-sm hm-text-12"
            onClick={() => props.handleFlightInfoBeenClicked(props.flight.flight_token)}
          >
            Select
          </button>
        </div>
      )}
    </div>
  );
}
