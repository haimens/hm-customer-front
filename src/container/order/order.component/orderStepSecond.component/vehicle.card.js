import React from "react";

export default function VehicleCard() {
  return (
    <div className="col-12 border-bottom bg-white hm-pointer-cursor" style={{ height: "88px" }}>
      <div className="row h-100 d-flex align-items-center">
        <div className="col-6">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-5">
              <img
                src={`${process.env.PUBLIC_URL}/img/haimensMain.jpg`}
                className="rounded-circle hm-pointer-cursor"
                style={{ height: "48px", width: "48px" }}
                alt="Driver"
              />
            </div>
            <div className="col-7">
              <div className="font-weight-bold hm-main-textColor hm-main-text-14">{123}</div>
              <div className="hm-main-textColor hm-main-text-12 mt-2">{123}</div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-5">
              <div className="hm-main-textColor font-weight-bold hm-main-text-16">$85.00</div>
            </div>
            <div className="col-7">
              <button className="btn purple-border-button hm-text-12 text-purple">
                <i className="fas fa-check mr-3 hm-text-12" />
                Selected
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
