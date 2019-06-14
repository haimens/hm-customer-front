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
      <section>
        <div className="col-10 mx-auto my-5">
          <h3>Contact Information</h3>
          <div className="row">
            <div className="col-4">
              <label className="haimens-margin-top-35 font-weight-bold" htmlFor="name">
                Name
              </label>
              <div className="d-flex">
                <input
                  type="text"
                  id="name"
                  className="form-control haimens-input-height"
                  onChange={this.handleInputChange}
                  value={name}
                />
              </div>
            </div>
            <div className="col-4">
              <label className="haimens-margin-top-35 font-weight-bold" htmlFor="phone">
                Phone
              </label>
              <div className="d-flex">
                <input
                  type="text"
                  id="phone"
                  className="form-control haimens-input-height"
                  onChange={this.handleInputChange}
                  value={phone}
                />
              </div>
            </div>
            <div className="col-4">
              <label className="haimens-margin-top-35 font-weight-bold" htmlFor="email">
                Email
              </label>
              <div className="d-flex">
                <input
                  type="email"
                  id="email"
                  className="form-control haimens-input-height"
                  onChange={this.handleInputChange}
                  value={email}
                />
              </div>
            </div>
            <div className="col-12">
              <div class="form-group">
                <label className="haimens-margin-top-35 font-weight-bold" htmlFor="special_instruction">
                  Special Instruction
                </label>
                <textarea
                  class="form-control"
                  rows="3"
                  id="special_instruction"
                  onChange={this.handleInputChange}
                  value={special_instruction}
                />
              </div>
            </div>
          </div>
          <div className="row py-5">
            <div className="col-4">
              <button
                type="button"
                className="btn haimens-main-button-outline w-100 haimens-input-height"
                onClick={() => this.handleChangePosition(-1)}
              >
                Back
              </button>
            </div>
            <div className="col-4">
              <button type="button" className="btn haimens-button-bgColor-sub text-white w-100 haimens-input-height">
                Contact Sales
              </button>
            </div>
            <div className="col-4">
              <button
                type="button"
                className="btn haimens-main-bgColor text-white w-100 haimens-input-height"
                onClick={() => this.handleChangePosition(1)}
              >
                Continue
              </button>
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
