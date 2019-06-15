import React, { Component } from "react";
import moment from "moment";
import GMapLocation from "../../../../components/shared/GMapLocation";
import alertify from "alertifyjs";
import { parseDecimal } from "../../../../actions/utilities.action";
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
  addTip = () => {
    console.log(this.state);
    const { tip, custom_tip } = this.state;
    const { amount } = this.props.parentProps;
    if (tip !== 0) {
      if (Number(tip) && tip >= 0) {
        this.setState({ alreadyAddedTips: true, finalTip: tip * amount, totalAmount: tip * amount + amount });
        this.props.handleTripAmount(tip);
      } else {
        alertify.alert("Something Wrong", "Please input correct amount of tip!");
      }
    }
    if (custom_tip !== "") {
      if (custom_tip !== 0) {
        if (Number(custom_tip) && custom_tip >= 0) {
          this.setState({ alreadyAddedTips: true, finalTip: custom_tip, totalAmount: parseInt(custom_tip) + amount });
          this.props.handleTripAmount(custom_tip);
        }
      }
    }
  };
  render() {
    const { pickup_date, pickup_time, dropoff_location, pickup_location, amount } = this.props.parentProps;
    const { tip, custom_tip, alreadyAddedTips, finalTip, totalAmount } = this.state;
    return (
      <div className="my-4">
        <h3>{`Trip #${this.props.trip}`}</h3>
        <div className="row">
          <div className="col-6 mt-4" style={{ height: "282px" }}>
            {
              /* {pickup_location.location !== "" && ( */
              <GMapLocation
                position={{
                  center: {
                    lat: pickup_location[0].geometry.location.lat(),
                    lng: pickup_location[0].geometry.location.lng()
                  },
                  origin: {
                    lat: pickup_location[0].geometry.location.lat(),
                    lng: pickup_location[0].geometry.location.lng()
                  },
                  destination: {
                    lat: dropoff_location[0].geometry.location.lat(),
                    lng: dropoff_location[0].geometry.location.lng()
                  }
                }}
              />
            }
          </div>
          <div className="col-6 d-flex flex-column p-0 justify-content-between mt-4" style={{ height: "282px" }}>
            <div>
              <h4 className="haimens-main-text-14">
                Pickup Time:
                <span className="haimens-main-textColor">{` ${moment(pickup_date).format("MM/DD/YYYY")}  ${moment(
                  pickup_time
                ).format("HH:mm a")}`}</span>
              </h4>
              <h4 className="haimens-main-text-14 mt-3">
                Pickup Location:
                <span className="haimens-main-textColor-sub">{` ${pickup_location !== "" &&
                  pickup_location[0].formatted_address}`}</span>
              </h4>
              <h4 className="haimens-main-text-14 mt-3">
                Dropoff Location:
                <span className="haimens-main-textColor">{` ${dropoff_location !== "" &&
                  dropoff_location[0].formatted_address}`}</span>
              </h4>
            </div>
            <div className={`row ${alreadyAddedTips && "d-none"}`}>
              <div className="col-10 d-flex justify-content-between">
                <button
                  className={`rounded tip-button-outline tip-button ${
                    tip === 10 ? "haimens-main-button-outline" : "tip-button-outline"
                  }`}
                  onClick={() => this.setState({ tip: 0.1, custom_tip: "" })}
                  id="10"
                >
                  10%
                </button>
                <button
                  className={`rounded tip-button-outline tip-button ${
                    tip === 15 ? "haimens-main-button-outline" : "tip-button-outline"
                  }`}
                  id="15"
                  onClick={() => this.setState({ tip: 0.15, custom_tip: "" })}
                >
                  15%
                </button>
                <button
                  className={`rounded tip-button-outline tip-button ${
                    tip === 20 ? "haimens-main-button-outline" : "tip-button-outline"
                  }`}
                  id="20"
                  onClick={() => this.setState({ tip: 0.2, custom_tip: "" })}
                >
                  20%
                </button>
                <input
                  className={`form-control stepFour-button-custom  ${custom_tip !== "" &&
                    "haimens-main-button-outline"}`}
                  placeholder="Other"
                  id="other"
                  type="number"
                  onChange={this.changeCustomTip}
                  value={custom_tip}
                />
                <button className="btn haimens-main-bgColor text-white stepFour-button-custom" onClick={this.addTip}>
                  Add Tip
                </button>
              </div>
            </div>
            <div>
              <h4 className="haimens-main-text-14 mt-4">
                Trip Total:
                <span>{`$ ${amount}`}</span>
              </h4>
              <h4 className="haimens-main-text-14 mt-3 align-middle">
                Tip:
                <span>{`$ ${finalTip}`}</span>
                {alreadyAddedTips && (
                  <i
                    className="far fa-times-circle text-danger ml-4 cursor"
                    onClick={() =>
                      this.setState({ tip: 0, custom_tip: "", alreadyAddedTips: false, finalTip: 0, totalAmount: 0 })
                    }
                  />
                )}
              </h4>
              <h4 className="haimens-main-text-18 haimens-main-textColor mt-3">
                Subtotal:
                <span>{`$ ${totalAmount}`}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderStepFourthDetail;
