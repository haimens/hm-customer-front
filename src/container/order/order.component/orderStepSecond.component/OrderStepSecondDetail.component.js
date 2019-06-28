import React, { Component } from "react";
import moment from "moment";
import { parsePrice } from "../../../../actions/utilities.action";
import "./OrderStepSecondDetail.component.css";
import GMapLocation from "../../../../components/shared/GMapLocation";
class OrderMapDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sedan: false,
      minivan: false
    };
  }

  handleCarClicked = async (type, price) => {
    if (type === "sedan") {
      await this.setState({
        sedan: true,
        minivan: false
      });
      this.props.handleTripAmount(price);
    }
    if (type === "miniVan") {
      await this.setState({
        sedan: false,
        minivan: true
      });
      this.props.handleTripAmount(price);
    }
  };

  render() {
    const { basic_info, quote_list } = this.props.parentProps;
    const { pickup_time, from_formatted, to_formatted, from_lat, from_lng, to_lat, to_lng } = basic_info;
    const { img_path: mini_img_path, amount: mini_amount } = quote_list[0];
    const { img_path: sedan_img_path, amount: sedan_amount } = quote_list[1];
    const { minivan, sedan } = this.state;
    return (
      <div>
        <h3>{`Trip #${this.props.trip}`}</h3>
        <h4 className="hm-main-text-14 mt-4">
          Pickup Time:
          <span className="hm-main-textColor">{pickup_time}</span>
        </h4>
        <h4 className="hm-main-text-14 mt-3">
          Pickup Location:
          <span className="hm-main-textColor-sub">{from_formatted}</span>
        </h4>
        <h4 className="hm-main-text-14 mt-3">
          Dropoff Location:
          <span className="hm-main-textColor">{to_formatted}</span>
        </h4>
        <div className="row">
          <div className="col-lg-6 col-12 mt-4" style={{ height: "282px" }}>
            {from_lat !== "" && (
              <GMapLocation
                position={{
                  center: {
                    lat: from_lat,
                    lng: from_lng
                  },
                  origin: {
                    lat: from_lat,
                    lng: from_lng
                  },
                  destination: {
                    lat: to_lat,
                    lng: to_lng
                  }
                }}
              />
            )}
          </div>
          <div className="col-lg-6 col-12 my-4" style={{ height: "282px" }}>
            <div className="d-flex flex-column justify-content-between " style={{ height: "100%" }} id="sedan">
              <div
                className="row p-2 border rounded orderMapHover pointer-cursor"
                style={{ height: "45%" }}
                onClick={() => this.handleCarClicked("sedan", mini_amount)}
              >
                <img src={mini_img_path} alt="mini_img_path" style={{ width: "110px", height: "100%" }} />
                <div className="p-1 ml-2 d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="hm-main-text-16 hm-main-textColor">SUNSHIRE SEDAN</h4>
                    <h4 className="hm-main-text-14 text-muted">Max 4 People</h4>
                    <h4 className="hm-main-text-14 text-muted">Max 3 Baggage</h4>
                  </div>
                  <h4 className="hm-main-text-16 hm-main-textColor">{parsePrice(mini_amount)}</h4>
                </div>
                {sedan && (
                  <div className="p-1 ml-auto">
                    <i className="fas fa-check hm-main-textColor-sub " />
                  </div>
                )}
              </div>

              <div
                className="row p-2 border rounded orderMapHover pointer-cursor"
                style={{ height: "45%" }}
                id="miniVan"
                onClick={() => this.handleCarClicked("miniVan", sedan_amount)}
              >
                <img src={sedan_img_path} alt="sedan_img_path" style={{ width: "110px", height: "100%" }} />
                <div className="p-1 ml-2 d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="hm-main-text-16 hm-main-textColor">SUNSHIRE MINIVAN</h4>
                    <h4 className="hm-main-text-14 text-muted">Max 6 People</h4>
                    <h4 className="hm-main-text-14 text-muted">Max 5 Baggage</h4>
                  </div>
                  <h4 className="hm-main-text-16 hm-main-textColor align-items-end">{parsePrice(sedan_amount)}</h4>
                </div>
                {minivan && (
                  <div className="p-1 ml-auto">
                    <i className="fas fa-check hm-main-textColor-sub " />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderMapDetail;
