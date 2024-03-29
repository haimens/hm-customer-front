import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TripSignIn from "./orderStepThird.component/tripSignIn.modal";
import { saveContact } from "../../../actions/contact.action";
import { createACustomerIn } from "../../../actions/customer.action";
import { createAOrder } from "../../../actions/order.action";
import alertify from "alertifyjs";
class OrderStepThird extends Component {
  state = {
    name: "",
    area: "+1",
    cell: "",
    email: "",
    special_instruction: ""
  };
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  signInFromTrip = () => {
    this.props.signInFromTrip();
  };

  handleGoBackPosition = () => {
    this.props.handleGoBack();
    this.props.handleChangePosition(-1);
  };

  handleChangePosition = async position => {
    const {
      createACustomerIn,
      history,
      round_trip_locally,
      first_local_trip,
      second_local_trip,
      createAOrder
    } = this.props;
    const { name, area, cell, email, special_instruction } = this.state;
    if (name !== "" && area !== "" && cell !== "" && email !== "") {
      await createACustomerIn(
        {
          customer_info: { name, email, cell: `${area} ${cell}` }
        },
        history,
        name
      );
      if (localStorage.getItem("instance_token") && localStorage.getItem("customer_token")) {
        if (round_trip_locally) {
          await createAOrder({
            customer_token: localStorage.getItem("customer_token"),
            quote_list: [
              { flight_str: first_local_trip.flight_str, quote_token: first_local_trip.selected_quote },
              { flight_str: second_local_trip.flight_str, quote_token: second_local_trip.selected_quote }
            ],
            note: special_instruction
          });
        } else {
          await createAOrder({
            customer_token: localStorage.getItem("customer_token"),
            quote_list: [{ flight_str: first_local_trip.flight_str, quote_token: first_local_trip.selected_quote }],
            note: special_instruction
          });
        }
      }
      this.props.handleChangePosition(1);
    } else {
      alertify.alert("Warning!", "Please Finish the Form Before Continue");
    }
  };

  setTripSignInOff = () => {
    this.setState({ showTripSignIn: false });
  };

  componentDidMount() {
    if (localStorage.getItem("name")) {
      this.setState({
        name: localStorage.getItem("name"),
        area: localStorage.getItem("cell").split(" ")[0],
        cell: localStorage.getItem("cell").split(" ")[1],
        email: localStorage.getItem("email")
      });
    } else {
      this.setState({ showTripSignIn: true });
    }
  }

  render() {
    const { name, area, cell, email, special_instruction, showTripSignIn } = this.state;
    const { history, handleChangePosition } = this.props;
    return (
      <section className="pb-5">
        {showTripSignIn && (
          <TripSignIn
            signInFromTrip={this.signInFromTrip}
            handleChangePosition={handleChangePosition}
            history={history}
            onClose={this.setTripSignInOff}
          />
        )}
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
                      placeholder="Name"
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
                      id="area"
                      placeholder="Area"
                      className="form-control hm-input-height col-3"
                      onChange={this.handleInputChange}
                      value={area}
                    />
                    <input
                      type="text"
                      id="cell"
                      placeholder="Cell"
                      className="form-control hm-input-height"
                      onChange={this.handleInputChange}
                      value={cell}
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
                      placeholder="Email"
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
                      Special Note
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Special Note"
                      id="special_instruction"
                      onChange={this.handleInputChange}
                      value={special_instruction}
                    />
                  </div>
                </div>
              </div>
              <div className="row pt-5">
                <div className="col-md-4 col-12 mt-3">
                  <button
                    type="button"
                    className="btn back-button w-100 hm-main-textColor font-weight-bold hm-input-height d-flex justify-content-between align-items-center"
                    onClick={this.handleGoBackPosition}
                  >
                    <img src={`${process.env.PUBLIC_URL}/img/icon_back.svg`} alt="roundTrip" />
                    <div>Back</div>
                    <div style={{ width: "20px" }} />
                  </button>
                </div>
                <div className="col-md-4 col-12 mt-3">
                  <button
                    type="button"
                    className="btn contact-sales-button text-white w-100 hm-input-height d-flex justify-content-between align-items-center"
                    onClick={() => window.Tawk_API.toggle()}
                  >
                    <img src={`${process.env.PUBLIC_URL}/img/icon_phone_white.svg`} alt="roundTrip" />
                    <div>Contact Sales</div>
                    <div style={{ width: "20px" }} />
                  </button>
                </div>
                <div className="col-md-4 col-12 mt-3">
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

const mapStateToProps = state => {
  return {
    round_trip_locally: state.localReducer.round_trip_locally,
    first_local_trip: state.localReducer.first_local_trip,
    second_local_trip: state.localReducer.second_local_trip,
    current_order: state.orderReducer.current_order
  };
};

const mapDispatchToProps = {
  saveContact,
  createACustomerIn,
  createAOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderStepThird));
