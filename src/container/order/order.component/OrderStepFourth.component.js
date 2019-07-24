import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderStepFourthDetail from "./orderStepFourth.component/OrderStepFourthDetail.component";
import alertify from "alertifyjs";
import { parsePrice } from "../../../actions/utilities.action";
import CreditCard from "./orderStepFourth.component/CreditCard.component";
import "./OrderStepFourth.component.css";
class OrderStepFourth extends Component {
  render() {
    return (
      <section>
        {/* <div className="col-md-10 col-12 mx-auto">
          <OrderStepFourthDetail
            trip={1}
            parentProps={{ first_trip, firstTrip }}
            handleTotalAmount={this.handleFirstTotalAmount}
          />
          {roundTrip && (
            <div>
              <hr className="my-5" />
              <OrderStepFourthDetail
                trip={2}
                parentProps={second_trip}
                handleTotalAmount={this.handleSecondTotalAmount}
              />
            </div>
          )}
          <hr className="my-5" />
          <div className="row">
            <div className="col-md-6 col-12">
              <h4 className="hm-main-text-28">Passenger Information</h4>
              <h4 className="hm-main-text-14 mt-4">
                Name:
                <span>{` ${contactInfo.name}`}</span>
              </h4>
              <h4 className="hm-main-text-14 mt-4">
                Phone:
                <span>{` ${contactInfo.phone}`}</span>
              </h4>
              <h4 className="hm-main-text-14 mt-4">
                Email:
                <span>{` ${contactInfo.email}`}</span>
              </h4>
              <h4 className="hm-main-text-14 mt-4">
                Special Instruction:
                <span>{` ${contactInfo.special_instruction}`}</span>
              </h4>
            </div>
            <div className="col-md-6 col-12">
              <h4 className="hm-main-text-28 mt-4 mt-md-0">Coupon</h4>
              <h4 className="hm-main-text-14 mt-4">Coupon Code</h4>
              <div className="d-flex  mt-4">
                <input
                  className={`form-control hm-input-height`}
                  placeholder="Other"
                  id="other"
                  type="text"
                  value={coupon}
                />
                <button className="btn hm-main-bgColor text-white stepFour-button-custom ml-4">Apply</button>
              </div>
            </div>
          </div>
          <div className="mt-5 text-right">
            <h4 className="hm-main-text-22">{`Subtotal: $ ${parsePrice(firstTotalAmount + secondTotalAmount)}`}</h4>
            <h4 className="hm-main-text-22">Discount: $</h4>
            <h4 className="hm-main-text-28">Total Due: $</h4>
          </div>
          <hr className="my-5" />
          <h4 className="hm-main-text-28">Payment Information</h4>
          <CreditCard
            parentProps={{ expiration_date, cvv, postal_code, card_number }}
            handleInputChange={this.handleInputChange}
          />
          <div className="row py-5">
            <div className="col-4">
              <button
                type="button"
                className="btn hm-main-button-outline w-100 hm-input-height"
                onClick={() => this.handleChangePosition(-1)}
              >
                Back
              </button>
            </div>
            <div className="col-4">
              <button type="button" className="btn hm-button-bgColor-sub text-white w-100 hm-input-height">
                Contact Sales
              </button>
            </div>
            <div className="col-4">
              <button
                type="button"
                className="btn hm-main-bgColor text-white w-100 hm-input-height"
                onClick={() => this.handleChangePosition(1)}
              >
                Continue
              </button>
            </div>
          </div>
        </div> */}
      </section>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  null
)(withRouter(OrderStepFourth));
