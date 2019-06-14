import React, { Component } from "react";
import moment from "moment";
import GMapLocation from "../../../../components/shared/GMapLocation";
import "./OrderStepFourthDetail.component.css";
class OrderStepFourthDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tip: "",
      custom_tip: ""
    };
  }
  changeCustomTip = e => {
    this.setState({
      tip: "",
      custom_tip: e.target.value
    });
  };
  addTip = () => {};
  render() {
    const { pickup_date, pickup_time, dropoff_location, pickup_location } = this.props.parentProps;
    const { tip, custom_tip } = this.state;
    return (
      <div className="my-4">
        <h3>{`Trip #1`}</h3>
        <div className="row">
          <div className="col-6 mt-4" style={{ height: "282px" }}>
            {
              /* {pickup_location.location !== "" && ( */
              <GMapLocation
                position={{
                  center: {
                    lat: 34.096756,
                    lng: -118.105667
                  },
                  origin: {
                    lat: 34.096756,
                    lng: -118.105667
                  },
                  destination: {
                    lat: 34.096756,
                    lng: -130.105667
                  }
                }}
              />
            }
          </div>
          <div className="col-6 d-flex flex-column p-0 justify-content-between mt-4" style={{ height: "282px" }}>
            <div>
              <h4 className="haimens-main-text-14">
                Pickup Time:
                <span className="haimens-main-textColor">{` 1222/2/2`}</span>
              </h4>
              <h4 className="haimens-main-text-14 mt-3">
                Pickup Location:
                <span className="haimens-main-textColor-sub">{` 123 s casdf`}</span>
              </h4>
              <h4 className="haimens-main-text-14 mt-3">
                Dropoff Location:
                <span className="haimens-main-textColor">{` 123 s casdf`}</span>
              </h4>
            </div>
            <div className="row ">
              <div className="col-10 d-flex justify-content-between">
                <button
                  className={`rounded tip-button-outline tip-button ${
                    tip === 10 ? "haimens-main-button-outline" : "tip-button-outline"
                  }`}
                  onClick={() => this.setState({ tip: 10, custom_tip: "" })}
                  id="10"
                >
                  10%
                </button>
                <button
                  className={`rounded tip-button-outline tip-button ${
                    tip === 15 ? "haimens-main-button-outline" : "tip-button-outline"
                  }`}
                  id="15"
                  onClick={() => this.setState({ tip: 15, custom_tip: "" })}
                >
                  15%
                </button>
                <button
                  className={`rounded tip-button-outline tip-button ${
                    tip === 20 ? "haimens-main-button-outline" : "tip-button-outline"
                  }`}
                  id="20"
                  onClick={() => this.setState({ tip: 20, custom_tip: "" })}
                >
                  20%
                </button>
                <input
                  className={`form-control tip-button-custom  ${custom_tip !== "" && "haimens-main-button-outline"}`}
                  placeholder="Other"
                  id="other"
                  type="text"
                  onClick={() => this.setState({ tip: "" })}
                  onChange={this.changeCustomTip}
                  value={custom_tip}
                />
                <button className="btn haimens-main-bgColor text-white tip-button-custom" onClick={this.addTip}>
                  Add Tip
                </button>
              </div>
            </div>
            <div>
              <h4 className="haimens-main-text-14 mt-4">
                Trip Total:
                <span>{` 1222/2/2`}</span>
              </h4>
              <h4 className="haimens-main-text-14 mt-3">
                Tip:
                <span>{` 123 s casdf`}</span>
              </h4>
              <h4 className="haimens-main-text-18 haimens-main-textColor mt-3">
                Subtotal:
                <span>{` 123 s casdf`}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderStepFourthDetail;
