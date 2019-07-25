import React, { Component } from "react";
import GMapLocation from "../../../../components/shared/GMapLocation";
import alertify from "alertifyjs";
import { parsePrice } from "../../../../actions/utilities.action";
import "./OrderStepFourthDetail.component.css";
class OrderStepFourthDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tip: 0,
      custom_tip: "",
      alreadyAddedTips: false,
      finalTip: 0,
      totalAmount: 0
    };
  }
  changeCustomTip = e => {
    this.setState({
      tip: 0,
      custom_tip: e.target.value
    });
  };
  handleTipCancel = async () => {
    await this.setState({ tip: 0, custom_tip: "", alreadyAddedTips: false, finalTip: 0, totalAmount: 0 });
    const { amount } = this.props.parentProps;
    this.props.handleTotalAmount(amount);
  };
  addTip = () => {
    const { tip, custom_tip } = this.state;
    const { amount } = this.props.parentProps.firstTrip;
    if (tip !== 0) {
      if (Number(tip) && tip >= 0) {
        this.setState({ alreadyAddedTips: true, finalTip: tip * amount, totalAmount: tip * amount + amount });
        this.props.handleTotalAmount(tip * amount + amount);
      } else {
        alertify.alert("Something Wrong", "Please input correct amount of tip!");
      }
    }
    if (custom_tip !== "") {
      if (custom_tip !== 0) {
        if (Number(custom_tip) && custom_tip >= 0) {
          this.setState({ alreadyAddedTips: true, finalTip: custom_tip, totalAmount: parseInt(custom_tip) + amount });
          this.props.handleTotalAmount(parseInt(custom_tip) + amount);
        }
      }
    }
  };
  render() {
    console.log(this.props.parentProps);
    const { first_trip, firstTrip } = this.props.parentProps;
    const { pickup_time, from_formatted, to_formatted, from_lat, from_lng, to_lat, to_lng } = first_trip.basic_info;
    const { tip, custom_tip, alreadyAddedTips, finalTip, totalAmount } = this.state;
    return (
      <div>
        <h3>{`Trip #${this.props.trip}`}</h3>
        <div className="row">
          <div className="col-md-6 col-12 mt-4" style={{ height: "282px" }}>
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
          <div
            className="col-md-6 col-12 d-flex flex-column p-md-0 p-3 justify-content-between mt-4"
            style={{ height: "282px" }}
          >
            <div>
              <h4 className="hm-main-text-14">
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
            </div>
            <div className={`row ${alreadyAddedTips && "d-none"}`}>
              <div className="col-md-10 col-12 d-flex justify-content-between">
                <button
                  className={`rounded tip-button-outline tip-button ${
                    tip === 10 ? "hm-main-button-outline" : "tip-button-outline"
                  }`}
                  onClick={() => this.setState({ tip: 0.1, custom_tip: "" })}
                  id="10"
                >
                  10%
                </button>
                <button
                  className={`rounded tip-button-outline tip-button ${
                    tip === 15 ? "hm-main-button-outline" : "tip-button-outline"
                  }`}
                  id="15"
                  onClick={() => this.setState({ tip: 0.15, custom_tip: "" })}
                >
                  15%
                </button>
                <button
                  className={`rounded tip-button-outline tip-button ${
                    tip === 20 ? "hm-main-button-outline" : "tip-button-outline"
                  }`}
                  id="20"
                  onClick={() => this.setState({ tip: 0.2, custom_tip: "" })}
                >
                  20%
                </button>
                <input
                  className={`form-control stepFour-button-custom  ${custom_tip !== "" && "hm-main-button-outline"}`}
                  placeholder="Other"
                  id="other"
                  type="number"
                  onChange={this.changeCustomTip}
                  value={custom_tip}
                />
                <button className="btn hm-main-bgColor text-white stepFour-button-custom" onClick={this.addTip}>
                  Add Tip
                </button>
              </div>
            </div>
            <div>
              <h4 className="hm-main-text-14 mt-4">
                Trip Total:
                <span>{parsePrice(firstTrip.amount)}</span>
              </h4>
              <h4 className="hm-main-text-14 mt-3 align-middle">
                Tip:
                <span>{parsePrice(finalTip)}</span>
                {alreadyAddedTips && (
                  <i className="far fa-times-circle text-danger ml-4 cursor" onClick={this.handleTipCancel} />
                )}
              </h4>
              <h4 className="hm-main-text-18 hm-main-textColor mt-3">
                Subtotal:
                <span>{parsePrice(totalAmount)}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderStepFourthDetail;
