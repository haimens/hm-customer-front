import React from "react";
import { parseAmount } from "../../../../actions/utilities.action";

export default function VehicleCard(props) {
  const { clicked, quote, onButtonSelected } = props;
  const { amount, car_type_name, img_path, max_capacity, quote_token } = quote;
  return (
    <div className="col-12 border-bottom bg-white hm-pointer-cursor" style={{ height: "88px" }}>
      <div className="row h-100 d-flex align-items-center">
        <div className="col-6">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-5">
              <img
                src={img_path}
                className="rounded-circle hm-pointer-cursor"
                style={{ height: "48px", width: "48px" }}
                alt="Driver"
              />
            </div>
            <div className="col-7">
              <div className="font-weight-bold hm-main-textColor hm-main-text-14">{car_type_name}</div>
              <div className="hm-main-textColor hm-main-text-12 mt-2">Max {max_capacity} passengers</div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-5">
              <div className="hm-main-textColor font-weight-bold hm-main-text-16">{parseAmount(amount, 2)}</div>
            </div>
            <div className="col-7">
              {clicked === quote_token ? (
                <button className="btn purple-border-button hm-text-12 text-purple">
                  <i className="fas fa-check mr-3 hm-text-12" />
                  Selected
                </button>
              ) : (
                <button className="btn bg-purple hm-text-12 text-white" onClick={() => onButtonSelected()}>
                  Select
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
