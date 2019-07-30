import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { parseAmount, convertUTCtoLocal } from "../../actions/utilities.action";
import { getOrderDetail } from "../../actions/order.action";
import { sendReceiptEmailToCustomer } from "../../actions/customer.action";
import TripDetail from "./orderDetail.component/TripDetail.container";

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

  handleSendEmail = () => {
    let msg = this.renderHTML();
    const { order_detail_in_payment, sendReceiptEmailToCustomer } = this.props;
    sendReceiptEmailToCustomer(order_detail_in_payment.customer_info.customer_token.order_token, msg);
  };

  renderHTML = () => {
    const { customer_info, order_discount_list, trip_list, order_info } = this.props.order_detail_in_payment;

    const renderAddressInfo = () => {
      if (trip_list.length > 0) {
        let string = "";
        trip_list.map((trip, idx) => {
          string += `             <tr>
          <th class="purchase_heading align-left">
            <p>Trip #${idx + 1}</p>
          </th>
          <th class="purchase_heading">
            <p class="align-right">Detail</p>
          </th>
        </tr><tr><td width="20%" class="purchase_item align-left" >From Address</td><td class="align-right" width="80%" class="purchase_item" align="middle">${
          trip.from_addr_str
        }</td></tr>
        `;
          string += `<tr><td width="20%" class="purchase_item align-left" >To Address</td><td class="align-right" width="80%" class="purchase_item" align="middle">${
            trip.to_addr_str
          }</td></tr>
      `;
          string += `<tr><td width="20%" class="purchase_item align-left" >Pickup Time</td><td class="align-right" width="80%" class="purchase_item" align="middle">${convertUTCtoLocal(
            trip.pickup_time
          )}</td></tr>
  `;
          return null;
        });
        return string;
      } else {
        return `<div></div>`;
      }
    };

    const renderAddonInfo = () => {
      if (order_discount_list.length > 0) {
        let string = "";
        order_discount_list.map(discount => {
          string += `<tr><td width="80%" class="purchase_item align-left" >Trip #${
            discount.code
          }</td><td class="align-right" width="20%" class="purchase_item" align="middle">${parseAmount(
            discount.amount,
            2
          )}</td></tr>
      `;
          return null;
        });
        return string;
      } else {
        return `<div></div>`;
      }
    };

    const renderTripInfo = () => {
      if (trip_list.length > 0) {
        let string = "";
        trip_list.map((trip, idx) => {
          string += `<tr><td width="80%" class="purchase_item align-left" >Trip #${idx +
            1}</td><td class="align-right" width="20%" class="purchase_item" align="middle">${parseAmount(
            trip.amount,
            2
          )}</td></tr>
        `;
          return null;
        });
        return string;
      } else {
        return `<div></div>`;
      }
    };

    const header = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Please pay {{ total }} due by {{ due_date }}</title>

    <style type="text/css" rel="stylesheet" media="all">
    
    *:not(br):not(tr):not(html) {
      font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
      box-sizing: border-box;
    }
    
    body {
      width: 100% !important;
      height: 100%;
      margin: 0;
      line-height: 1.4;
      background-color: #F2F4F6;
      color: #74787E;
      -webkit-text-size-adjust: none;
    }
    
    p,
    ul,
    ol,
    blockquote {
      line-height: 1.4;
      text-align: left;
    }
    
    a {
      color: #3869D4;
    }
    
    a img {
      border: none;
    }
    
    td {
      word-break: break-word;
    }
    /* Layout ------------------------------ */
    
    .email-wrapper {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      background-color: #F2F4F6;
    }
    
    .email-content {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    /* Masthead ----------------------- */
    
    .email-masthead {
      padding: 25px 0;
      text-align: center;
    }
    
    .email-masthead_logo {
      width: 94px;
    }
    
    .email-masthead_name {
      font-size: 16px;
      font-weight: bold;
      color: #bbbfc3;
      text-decoration: none;
      text-shadow: 0 1px 0 white;
    }
    /* Body ------------------------------ */
    
    .email-body {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      border-top: 1px solid #EDEFF2;
      border-bottom: 1px solid #EDEFF2;
      background-color: #FFFFFF;
    }
    
    .email-body_inner {
      width: 570px;
      margin: 0 auto;
      padding: 0;
      -premailer-width: 570px;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      background-color: #FFFFFF;
    }
    
    .email-footer {
      width: 570px;
      margin: 0 auto;
      padding: 0;
      -premailer-width: 570px;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      text-align: center;
    }
    
    .email-footer p {
      color: #AEAEAE;
    }
    
    .body-action {
      width: 100%;
      margin: 30px auto;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      text-align: center;
    }
    
    .body-sub {
      margin-top: 25px;
      padding-top: 25px;
      border-top: 1px solid #EDEFF2;
    }
    
    .content-cell {
      padding: 35px;
    }
    
    .preheader {
      display: none !important;
      visibility: hidden;
      mso-hide: all;
      font-size: 1px;
      line-height: 1px;
      max-height: 0;
      max-width: 0;
      opacity: 0;
      overflow: hidden;
    }
    /* Attribute list ------------------------------ */
    
    .attributes {
      margin: 0 0 21px;
    }
    
    .attributes_content {
      background-color: #EDEFF2;
      padding: 16px;
    }
    
    .attributes_item {
      padding: 0;
    }
    /* Related Items ------------------------------ */
    
    .related {
      width: 100%;
      margin: 0;
      padding: 25px 0 0 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .related_item {
      padding: 10px 0;
      color: #74787E;
      font-size: 15px;
      line-height: 18px;
    }
    
    .related_item-title {
      display: block;
      margin: .5em 0 0;
    }
    
    .related_item-thumb {
      display: block;
      padding-bottom: 10px;
    }
    
    .related_heading {
      border-top: 1px solid #EDEFF2;
      text-align: center;
      padding: 25px 0 10px;
    }
    /* Discount Code ------------------------------ */
    
    .discount {
      width: 100%;
      margin: 0;
      padding: 24px;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      background-color: #EDEFF2;
      border: 2px dashed #9BA2AB;
    }
    
    .discount_heading {
      text-align: center;
    }
    
    .discount_body {
      text-align: center;
      font-size: 15px;
    }
    /* Social Icons ------------------------------ */
    
    .social {
      width: auto;
    }
    
    .social td {
      padding: 0;
      width: auto;
    }
    
    .social_icon {
      height: 20px;
      margin: 0 8px 10px 8px;
      padding: 0;
    }
    /* Data table ------------------------------ */
    
    .purchase {
      width: 100%;
      margin: 0;
      padding: 35px 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .purchase_content {
      width: 100%;
      margin: 0;
      padding: 25px 0 0 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .purchase_item {
      padding: 10px 0;
      color: #74787E;
      font-size: 12px;
      line-height: 18px;
    }
    
    .purchase_heading {
      padding-bottom: 8px;
      padding-left: 0px;
      border-bottom: 1px solid #EDEFF2;
    }
    
    .purchase_heading p {
      margin: 0;
      color: #9BA2AB;
      font-size: 12px;
    }
    
    .purchase_footer {
      padding-top: 15px;
      border-top: 1px solid #EDEFF2;
    }
    
    .purchase_total {
      margin: 0;
      text-align: right;
      font-weight: bold;
      color: #2F3133;
    }
    
    .purchase_total--label {
      padding: 0 15px 0 0;
    }
    /* Utilities ------------------------------ */
    
    .align-right {
      text-align: right;
    }
    
    .align-left {
      text-align: left;
    }
    
    .align-center {
      text-align: center;
    }
    /*Media Queries ------------------------------ */
    
    @media only screen and (max-width: 600px) {
      .email-body_inner,
      .email-footer {
        width: 100% !important;
      }
    }
    
    @media only screen and (max-width: 500px) {
      .button {
        width: 100% !important;
      }
    }
    /* Buttons ------------------------------ */
    
    .button {
      background-color: #3869D4;
      border-top: 10px solid #3869D4;
      border-right: 18px solid #3869D4;
      border-bottom: 10px solid #3869D4;
      border-left: 18px solid #3869D4;
      display: inline-block;
      color: #FFF;
      text-decoration: none;
      border-radius: 3px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
      -webkit-text-size-adjust: none;
    }
    
    .button--green {
      background-color: #22BC66;
      border-top: 10px solid #22BC66;
      border-right: 18px solid #22BC66;
      border-bottom: 10px solid #22BC66;
      border-left: 18px solid #22BC66;
    }
    
    .button--red {
      background-color: #FF6136;
      border-top: 10px solid #FF6136;
      border-right: 18px solid #FF6136;
      border-bottom: 10px solid #FF6136;
      border-left: 18px solid #FF6136;
    }
    /* Type ------------------------------ */
    
    h1 {
      margin-top: 0;
      color: #2F3133;
      font-size: 19px;
      font-weight: bold;
      text-align: left;
    }
    
    h2 {
      margin-top: 0;
      color: #2F3133;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
    }
    
    h3 {
      margin-top: 0;
      color: #2F3133;
      font-size: 14px;
      font-weight: bold;
      text-align: left;
    }
    
    p {
      margin-top: 0;
      color: #74787E;
      font-size: 16px;
      line-height: 1.5em;
      text-align: left;
    }
    
    p.sub {
      font-size: 12px;
    }
    
    p.center {
      text-align: center;
    }
    </style>
  </head>
  <body>
                  `;
    const footer = `
      </body>
    </html>
              `;
    const html = `
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="email-masthead">
                ${localStorage.getItem("company_name")}
            </td>
          </tr>
          <tr>
            <td class="email-body" width="100%" cellpadding="0" cellspacing="0">
              <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-cell">
                    <h1>Hi ${customer_info.name},</h1>
                    <p>Thanks for using ${localStorage.getItem(
                      "company_name"
                    )}. This is an receipt for your recent purchase.</p>
                    <table class="attributes" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td class="attributes_content">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td class="attributes_item align-center"><strong>Amount Total: </strong>${parseAmount(
                                order_info.amount,
                                2
                              )}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <table class="purchase" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <h3>Created Date</h3></td>
                        <td>
                          <h3 class="align-right">${convertUTCtoLocal(order_info.cdate)}</h3></td>
                      </tr>
                      <tr>
                      <td colspan="2">
                        <table class="purchase_content" width="100%" cellpadding="0" cellspacing="0">
                            ${renderAddressInfo()}
                      </table>
                    </td>
                  </tr>
                      <tr>
                        <td colspan="2">
                          <table class="purchase_content" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <th class="purchase_heading align-left">
                                <p>Description</p>
                              </th>
                              <th class="purchase_heading">
                                <p class="align-right">Amount</p>
                              </th>
                            </tr>
                              ${renderAddonInfo()}
                              ${renderTripInfo()}
                            <tr>
                              <td width="80%" class="purchase_footer" valign="middle">
                                <p class="purchase_total purchase_total--label">Total</p>
                              </td>
                              <td width="20%" class="purchase_footer" valign="middle">
                                <p class="purchase_total">${parseAmount(order_info.amount, 2)}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-cell" align="center">
                    <p class="sub align-center">&copy; 2019 ${localStorage.getItem(
                      "company_name"
                    )}. All rights reserved.</p>
                    <p class="sub align-center">
                      ${this.state.address}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
            `;
    this.html = header + html + footer;
    return this.html;
  };

  async componentDidMount() {
    if (this.props.login) {
      const { getOrderDetail, match } = this.props;
      await getOrderDetail(match.params.order_token, true);
      let sum = 0;
      this.props.order_detail_in_payment.trip_list.map(tri => {
        sum += tri.amount;
        return null;
      });
      this.setState({ sum });
    } else {
      this.props.history.push("/");
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
                  <div className="container text-center">
                    <div className="text-main-textColor hm-main-text-24" style={{ color: "#5aad00" }}>
                      Order {order_info && order_info.status_str}!
                    </div>
                    <div className="text-main-textColor hm-main-text-24" style={{ wordBreak: "break-all" }}>
                      Your confirmation number is: {order_info && order_info.receipt ? order_info.receipt : "N/A"}
                    </div>
                  </div>
                </div>
                {order_detail_in_payment.showMap &&
                  order_detail_in_payment.trip_list.map((trip, index) => (
                    <div className="pb-5" key={index}>
                      <TripDetail
                        num={index + 1}
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
                      <div className="col-12 mb-4">
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

                    <div className="row pt-5">
                      <div className="col-md-4 col-12 mt-3">
                        <button
                          className="btn back-button w-100 hm-input-height d-flex justify-content-between align-items-center"
                          onClick={this.handleSendEmail}
                        >
                          <i className="fas fa-envelope" style={{ fontSize: "19px" }} />
                          <div>Send Receipt</div>
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
                          onClick={() => this.props.history.push("/")}
                        >
                          <div style={{ width: "20px" }} />
                          <div>Book Again</div>
                          <img src={`${process.env.PUBLIC_URL}/img/icon_continue.svg`} alt="roundTrip" />
                        </button>
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
  getOrderDetail,
  sendReceiptEmailToCustomer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderDetail));
