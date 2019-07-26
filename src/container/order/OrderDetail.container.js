import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { parseAmount } from "../../actions/utilities.action";
import { getOrderDetail } from "../../actions/order.action";
import TripDetail from "./order.component/orderDetail.share/tripDetail.component";

class OrderDetail extends Component {
  state = {
    sum: 0
  };
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

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
    if (this.props.login) {
      const { getOrderDetail, match } = this.props;
      await getOrderDetail(match.params.order_token);
      let sum = 0;
      this.props.order_detail_in_payment.trip_list.map(tri => {
        sum += tri.amount;
        return null;
      });
      this.setState({ sum });
    }
  }

  render() {
    const { round_trip_locally, order_detail_in_payment } = this.props;
    const { customer_info, order_discount_list, trip_list, order_info } = order_detail_in_payment;
    return (
      <section className="pb-5">
        <div className="trip-tab">
          <div className="d-flex justify-content-center align-items-center" style={{ height: "141px" }}>
            <h1 className="text-center text-white trip-header">Booking History</h1>
          </div>
          <div className="container-fluid  pb-5">
            <div className="row pb-5">
              <div className="col-10 px-0 bg-white mx-auto custom-shadow py-4 p-3">
                <div className="custom-radius-top">
                  <div className="container">
                    <div className="text-main-textColor hm-main-text-24">
                      <span className="hm-main-text-24" style={{ color: "#5aad00" }}>
                        Order Complete!
                      </span>
                      Your confirmation number is: {order_info && order_info.receipt}
                    </div>
                  </div>
                </div>
                {order_detail_in_payment.trip_list.map((trip, index) => (
                  <div className="pb-5" key={index}>
                    <TripDetail
                      hideVehicleCard={true}
                      num={index + 1}
                      handleOnButtonSelected={this.handleOnButtonSelected}
                      trip={{
                        basic_info: trip,
                        quote_list: "",
                        showMap: order_detail_in_payment.showMap
                      }}
                    />
                  </div>
                ))}
                <div className="container">
                  <div
                    className="d-flex align-items-center justify-content-between border-bottom"
                    style={{ height: "86px" }}
                  >
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
                        <div className="text-main-textColor hm-main-text-14 font-weight-bold">
                          {customer_info.email}
                        </div>
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
                        {order_discount_list &&
                          order_discount_list.length > 0 &&
                          order_discount_list.map((order, index) => <div key={index}>{order.code}</div>)}
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
    login: state.authReducer.login,
    round_trip_locally: state.localReducer.round_trip_locally,
    current_order: state.orderReducer.current_order,
    order_detail_in_payment: state.orderReducer.order_detail_in_payment
  };
};

const mapDispatchToProps = {
  getOrderDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderDetail));
