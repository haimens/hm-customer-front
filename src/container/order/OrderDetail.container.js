import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderStepFourthDetail from "./orderStepFourth.component/OrderStepFourthDetail.component";
import alertify from "alertifyjs";
import { parsePrice, parseAmount } from "../../../actions/utilities.action";
import CreditCard from "./orderStepFourth.component/CreditCard.component";
import TripDetail from "./orderDetail.share/tripDetail.component";
import {
  getOrderDetail,
  applyCouponToOrder,
  removeCouponToOrder,
  finalizeOrder,
  handleSubmitAPaymentInLord
} from "../../../actions/order.action";
import "./OrderStepFourth.component.css";
class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupon: "",
      loaded: false,
      sum: 0,
      total_discount: 0
    };
  }

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  async componentWillMount() {
    const that = this;
    let sqPaymentScript = document.createElement("script");
    sqPaymentScript.src = "https://js.squareup.com/v2/paymentform";
    sqPaymentScript.type = "text/javascript";
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
      that.setState({
        loaded: true
      });
    };
    document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
  }

  getDiscount = discount => {
    const { sum } = this.state;
    if (discount.type === 1) {
      return (discount.amount / 100).toFixed(2);
    }
    if (discount.type === 2) {
      return (((discount.rate / 1000) * sum) / 100).toFixed(2);
    }
  };

  getSum = order_discount_list => {
    let totalDiscount = 0;
    const { sum } = this.state;
    order_discount_list.map((discount, index) => {
      if (discount.type === 1) {
        totalDiscount += discount.amount / 100;
      }
      if (discount.type === 2) {
        totalDiscount += ((discount.rate / 1000) * sum) / 100;
      }
      return null;
    });
    console.log(totalDiscount);
    return (sum / 100 - totalDiscount).toFixed(2);
  };

  handleApplyCouponToOrder = () => {
    const { coupon } = this.state;
    if (coupon) {
      const { current_order } = this.props;
      this.props.applyCouponToOrder(current_order.order_token, { code: coupon });
    }
  };

  async componentDidMount() {
    const { getOrderDetail, current_order } = this.props;
    await getOrderDetail(current_order.order_token);
    let sum = 0;
    this.props.order_detail_in_payment.trip_list.map(tri => {
      sum += tri.amount;
      return null;
    });
    this.setState({ sum });
  }

  handleRemoveDiscount = order_discount_token => {
    const { current_order, removeCouponToOrder } = this.props;
    removeCouponToOrder(current_order.order_token, order_discount_token, { status: 0 });
  };

  render() {
    const {
      round_trip_locally,
      order_detail_in_payment,
      finalizeOrder,
      handleSubmitAPaymentInLord,
      current_order
    } = this.props;
    const { customer_info, order_discount_list, trip_list } = order_detail_in_payment;
    const { coupon, loaded } = this.state;
    return (
      <section className="pb-5">
        <div className="col-md-10 col-12 mx-auto shadow">
          {order_detail_in_payment.trip_list.map((trip, index) => (
            <div className="pb-5" key={index}>
              <TripDetail
                hideVehicleCard={true}
                num={index + 1}
                handleOnButtonSelected={this.handleOnButtonSelected}
                trip={{
                  basic_info: trip,
                  quote_list: "",
                  showMap: true
                }}
              />
            </div>
          ))}

          <div className="container">
            <div className="d-flex align-items-center justify-content-between border-bottom" style={{ height: "86px" }}>
              <h3 className="mt-3 hm-main-textColor hm-text-22 font-weight-bold">Passenger Information</h3>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="mt-4">
                  <div className="text-grey hm-main-text-14 font-weight-500">Name</div>
                  <div className="text-main-textColor hm-main-text-14 font-weight-bold">{customer_info.name}</div>
                </div>
                <div className="mt-4">
                  <div className="text-grey hm-main-text-14 font-weight-500">Cell</div>
                  <div className="text-main-textColor hm-main-text-14 font-weight-bold">{customer_info.cell}</div>
                </div>
                <div className="mt-4">
                  <div className="text-grey hm-main-text-14 font-weight-500">Email</div>
                  <div className="text-main-textColor hm-main-text-14 font-weight-bold">{customer_info.email}</div>
                </div>
                <div className="mt-4">
                  <div className="text-grey hm-main-text-14 font-weight-500">Special Instruction</div>
                  <div className="text-main-textColor hm-main-text-14 font-weight-bold">
                    {customer_info.note ? customer_info.note : "N/A"}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className="d-flex align-items-center justify-content-between border-bottom"
                style={{ height: "86px" }}
              >
                <h3 className="mt-3 hm-main-textColor hm-text-22 font-weight-bold">Coupon</h3>
              </div>
              <div className="row">
                <div className="col-6 mt-4">
                  <label className="text-main-textColor hm-main-text-14 font-weight-bold">Coupon Code</label>
                  <div className="d-flex">
                    <input
                      className={`form-control hm-input-height`}
                      placeholder="Coupon"
                      id="coupon"
                      type="text"
                      value={coupon}
                      onChange={this.handleInputChange}
                    />
                    <button
                      className="btn hm-main-bgColor text-white stepFour-button-custom ml-4"
                      onClick={this.handleApplyCouponToOrder}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                className="d-flex align-items-center justify-content-between border-bottom"
                style={{ height: "86px" }}
              >
                <h3 className="mt-3 hm-main-textColor hm-text-22 font-weight-bold">Price Breakdown</h3>
              </div>
              <div className="row px-5 pt-5">
                <div className="col-12">
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <div className="text-secondary-color hm-text-14 font-weight-bold">Trip 1 Subtotal:</div>
                    <div className="hm-text-14 font-weight-bold text-modal-color">
                      +{parseAmount(trip_list[0].amount, 2)}
                    </div>
                  </div>
                </div>
                {round_trip_locally && (
                  <div className="col-12">
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <div className="text-secondary-color hm-text-14 font-weight-bold">Trip 2 Subtotal:</div>
                      <div className="hm-text-14 font-weight-bold text-modal-color">
                        +{parseAmount(trip_list[1].amount, 2)}
                      </div>
                    </div>
                  </div>
                )}

                {order_discount_list &&
                  order_discount_list.map((discount, index) => (
                    <div className="col-12" key={index}>
                      <div className="d-flex justify-content-between border-bottom py-2">
                        <div className="text-secondary-color hm-text-14 font-weight-bold">Discount:</div>
                        <div className="d-flex align-items-center">
                          <i
                            className="fas fa-trash-alt mr-3 text-danger hm-pointer-cursor"
                            onClick={() => this.handleRemoveDiscount(discount.order_discount_token)}
                          />
                          <div className="hm-text-14 font-weight-bold text-modal-color">
                            -${this.getDiscount(discount)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="col-12">
                  <div className="d-flex justify-content-between py-3">
                    <div className="text-secondary-color hm-text-14 font-weight-bold hm-title-sub-size">
                      Order Total Due:
                    </div>
                    <div className="hm-title-sub-size font-weight-bold text-modal-color">
                      {order_discount_list && this.getSum(order_discount_list)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className="d-flex align-items-center justify-content-between border-bottom"
                style={{ height: "86px" }}
              >
                <h3 className="mt-3 hm-main-textColor hm-text-22 font-weight-bold">Payment Information</h3>
              </div>
              {loaded && (
                <CreditCard
                  order_token={current_order.order_token}
                  finalizeOrder={finalizeOrder}
                  handleSubmitAPaymentInLord={handleSubmitAPaymentInLord}
                  paymentForm={window.SqPaymentForm}
                  handleInputChange={this.handleInputChange}
                />
              )}
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
    current_order: state.orderReducer.current_order,
    order_detail_in_payment: state.orderReducer.order_detail_in_payment
  };
};

const mapDispatchToProps = {
  getOrderDetail,
  applyCouponToOrder,
  removeCouponToOrder,
  finalizeOrder,
  handleSubmitAPaymentInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderDetail));
