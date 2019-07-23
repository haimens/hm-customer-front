import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import alertify from "alertifyjs";
import { saveContact } from "../../../actions/contact.action";
class OrderStepThird extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    special_instruction: ""
  };
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
    if (id === "passenger_amount") {
      this.props.updatePassenger(value);
    }
    if (id === "flight") {
      this.props.updateFlight(value);
    }
  };

  handleChangePosition = position => {
    if (position < 0) {
      this.props.handleChangePosition(position);
      return;
    }
    const { name, phone, email, special_instruction } = this.state;
    if (name && phone && email && special_instruction) {
      this.props.saveContact({ ...this.state });
      this.props.handleChangePosition(position);
    } else {
      alertify.alert("Something Wrong", "Please Finished the Form Before Submit!");
    }
  };

  render() {
    const { name, phone, email, special_instruction } = this.state;
    return (
      <section className="pb-5">
        <div className="col-md-10 col-12 mx-auto shadow">
          <div className="pb-5">
            <div className="container">
              <div
                className="d-flex align-items-center justify-content-between border-bottom"
                style={{ height: "86px" }}
              >
                <h3 className="mt-3 hm-main-textColor hm-text-22 font-weight-bold">Contact Information</h3>
              </div>
              <div className="row mt-4">
                <div className="col-md-4 col-12">
                  <label className="hm-main-textColor-sub hm-main-text-14 font-weight-bold" htmlFor="name">
                    Name
                  </label>
                  <div className="d-flex">
                    <input
                      type="text"
                      id="name"
                      className="form-control hm-input-height"
                      onChange={this.handleInputChange}
                      value={name}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <label className="hm-main-textColor-sub hm-main-text-14 font-weight-bold" htmlFor="phone">
                    Phone
                  </label>
                  <div className="d-flex">
                    <input
                      type="text"
                      id="phone"
                      className="form-control hm-input-height"
                      onChange={this.handleInputChange}
                      value={phone}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <label className="hm-main-textColor-sub hm-main-text-14 font-weight-bold" htmlFor="email">
                    Email
                  </label>
                  <div className="d-flex">
                    <input
                      type="email"
                      id="email"
                      className="form-control hm-input-height"
                      onChange={this.handleInputChange}
                      value={email}
                    />
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="form-group">
                    <label
                      className="hm-main-textColor-sub hm-main-text-14 font-weight-bold"
                      htmlFor="special_instruction"
                    >
                      Special Instruction
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      id="special_instruction"
                      onChange={this.handleInputChange}
                      value={special_instruction}
                    />
                  </div>
                </div>
              </div>
              <div className="row pt-5">
                <div className="col-4">
                  <button
                    type="button"
                    className="btn back-button w-100 hm-main-textColor font-weight-bold hm-input-height d-flex justify-content-between align-items-center"
                    onClick={this.handleChangePosition}
                  >
                    <img src={`${process.env.PUBLIC_URL}/img/icon_back.svg`} alt="roundTrip" />
                    <div>Back</div>
                    <div style={{ width: "20px" }} />
                  </button>
                </div>
                <div className="col-4">
                  <button
                    type="button"
                    className="btn contact-sales-button text-white w-100 hm-input-height d-flex justify-content-between align-items-center"
                    onClick={this.handleChangePosition}
                  >
                    <img src={`${process.env.PUBLIC_URL}/img/icon_phone_white.svg`} alt="roundTrip" />
                    <div>Contact Sales</div>
                    <div style={{ width: "20px" }} />
                  </button>
                </div>
                <div className="col-4">
                  <button
                    type="button"
                    className="btn round-trip-button text-white w-100 hm-input-height d-flex justify-content-between align-items-center"
                    onClick={this.handleChangePosition}
                  >
                    <div style={{ width: "20px" }} />
                    <div>Continue</div>
                    <img src={`${process.env.PUBLIC_URL}/img/icon_continue.svg`} alt="roundTrip" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  saveContact
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(OrderStepThird));
