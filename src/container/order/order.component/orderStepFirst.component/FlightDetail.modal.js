import React, { Component } from "react";
import { Modal, FlightCard, FlightCardNoRecord } from "../../../../components/shared";

export default class FlightDetail extends Component {
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleClose = () => {
    this.props.onClose();
  };
  handleFlightInfoBeenClicked = flight_token => {
    this.props.saveFlightToken(flight_token);
    this.handleClose();
  };

  render() {
    const { flight_list_in_lord, hideButton } = this.props;
    return (
      <Modal
        title="Flight Information"
        onClose={this.handleClose}
        position="center"
        getWidth={"700px"}
        getHeight={"570px"}
      >
        <div className="container-fluid">
          <div className="row">
            {flight_list_in_lord.record_list.length > 0 &&
              flight_list_in_lord.record_list.map((flight, index) => (
                <FlightCard
                  hideButton={hideButton}
                  key={index}
                  handleFlightInfoBeenClicked={this.handleFlightInfoBeenClicked}
                  flight={flight}
                />
              ))}
            {flight_list_in_lord.record_list.length === 0 && <FlightCardNoRecord />}
          </div>
        </div>
      </Modal>
    );
  }
}
