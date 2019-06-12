import React, { Component } from "react";
import moment from "moment";
import GMapLocation from "../../../components/shared/GMapLocation";
import "./OrderMapDetail.component.css";
class OrderMapDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sedan: false,
      minivan: false
    };
  }

  handleCarClicked = async type => {
    if (type === "sedan") {
      await this.setState({
        sedan: true,
        minivan: false
      });
    }
    if (type === "miniVan") {
      await this.setState({
        sedan: false,
        minivan: true
      });
    }
  };

  render() {
    const { pickup_date, pickup_time, dropoff_location, pickup_location } = this.props.parentProps;
    const { minivan, sedan } = this.state;
    return (
      <div className="my-4">
        <h3>{`Trip #${this.props.trip}`}</h3>
        <h4 className="haimens-main-text-14 mt-4">
          Pickup Time:
          <span className="haimens-main-textColor">{` ${moment(pickup_date.date).format("MM/DD/YYYY")}  ${moment(
            pickup_time.time
          ).format("HH:mm a")}`}</span>
        </h4>
        <h4 className="haimens-main-text-14 mt-3">
          Pickup Location:{" "}
          <span className="haimens-main-textColor-sub">{` ${pickup_location.location !== "" &&
            pickup_location.location[0].formatted_address}`}</span>
        </h4>
        <h4 className="haimens-main-text-14 mt-3">
          Dropoff Location:
          <span className="haimens-main-textColor">{` ${dropoff_location.location !== "" &&
            dropoff_location.location[0].formatted_address}`}</span>
        </h4>
        <div className="row">
          <div className="col-6 mt-4" style={{ height: "282px" }}>
            {pickup_location.location !== "" && (
              <GMapLocation
                position={{
                  center: {
                    lat: pickup_location.location[0].geometry.location.lat(),
                    lng: pickup_location.location[0].geometry.location.lng()
                  },
                  origin: {
                    lat: pickup_location.location[0].geometry.location.lat(),
                    lng: pickup_location.location[0].geometry.location.lng()
                  },
                  destination: {
                    lat: dropoff_location.location[0].geometry.location.lat(),
                    lng: dropoff_location.location[0].geometry.location.lng()
                  }
                }}
              />
            )}
          </div>
          <div className="col-6 my-4" style={{ height: "282px" }}>
            <div className="d-flex flex-column justify-content-between " style={{ height: "100%" }} id="sedan">
              <div
                className="row p-2 border rounded orderMapHover"
                style={{ height: "45%" }}
                onClick={() => this.handleCarClicked("sedan")}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/img/haimensMain.png`}
                  alt=""
                  style={{ width: "110px", height: "100%" }}
                />
                <div className="p-1 ml-2 d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="haimens-main-text-16 haimens-main-textColor">SUNSHIRE SEDAN</h4>
                    <h4 className="haimens-main-text-14 text-muted">Max 4 People</h4>
                    <h4 className="haimens-main-text-14 text-muted">Max 3 Baggage</h4>
                  </div>
                  <h4 className="haimens-main-text-16 haimens-main-textColor">$85.00</h4>
                </div>
                {sedan && (
                  <div className="p-1 ml-auto">
                    <i className="fas fa-check haimens-main-textColor-sub " />
                  </div>
                )}
              </div>

              <div
                className="row p-2 border rounded orderMapHover"
                style={{ height: "45%" }}
                id="miniVan"
                onClick={() => this.handleCarClicked("miniVan")}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/img/haimensMain.png`}
                  alt=""
                  style={{ width: "110px", height: "100%" }}
                />
                <div className="p-1 ml-2 d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="haimens-main-text-16 haimens-main-textColor">SUNSHIRE MINIVAN</h4>
                    <h4 className="haimens-main-text-14 text-muted">Max 6 People</h4>
                    <h4 className="haimens-main-text-14 text-muted">Max 5 Baggage</h4>
                  </div>
                  <h4 className="haimens-main-text-16 haimens-main-textColor align-items-end">$105.00</h4>
                </div>
                {minivan && (
                  <div className="p-1 ml-auto">
                    <i className="fas fa-check haimens-main-textColor-sub " />
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
