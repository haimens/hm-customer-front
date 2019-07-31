import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getOrderHistoryFromCustomer } from "../../actions/order.action";
import { ListView } from "../../components/shared";
import OrderListItem from "./orderList.component/OrderList.item";
class OrderList extends Component {
  state = {
    status: 4
  };

  handleSetStatus = async status => {
    this.props.getOrderHistoryFromCustomer({ status });
    await this.setState({ status });
  };

  componentDidMount() {
    this.props.getOrderHistoryFromCustomer({ status: 4 });
  }
  handlePageChange = start => {
    this.props.getOrderHistoryFromCustomer({ start });
  };
  render() {
    const { order_history_from_customer, history } = this.props;
    const { status } = this.state;
    return (
      <section className="pb-5">
        <div className="trip-tab ">
          <div className="d-flex justify-content-center align-items-center" style={{ height: "141px" }}>
            <h1 className="text-center text-white trip-header">Booking History</h1>
          </div>
          <div className="container-fluid pb-5">
            <div className="row pb-5">
              <div className="col-10 px-0 bg-white mx-auto custom-shadow">
                <div className="d-flex justify-content-between flex-column flex-md-row">
                  <div className="custom-radius-top px-5 tab bg-white font-weight-bold hm-main-textColor hm-main-text-20 d-flex align-items-center justify-content-center">
                    Booking History
                  </div>
                  <div className="d-flex mr-md-5 mr-0 px-0 px-md-5 align-items-center justify-content-center">
                    <button
                      className={`btn mr-2 shadow-sm ${
                        status === 3 ? "bg-purple text-white" : "bg-white text-purple border-purple"
                      }`}
                      onClick={() => this.handleSetStatus(3)}
                    >
                      Confirmed
                    </button>
                    <button
                      className={`btn shadow-sm ${
                        status === 4 ? "bg-purple text-white" : "bg-white text-purple border-purple"
                      }`}
                      onClick={() => this.handleSetStatus(4)}
                    >
                      Completed
                    </button>
                  </div>
                </div>

                <ListView
                  totalCount={order_history_from_customer.count}
                  title="Earning List"
                  fieldNames={["Order Date", "Confirmation Number", "Status", "Detail"]}
                  hideHeader={true}
                  onPageChange={this.handlePageChange}
                >
                  {order_history_from_customer.record_list.map((order, index) => (
                    <OrderListItem history={history} parentProps={order} key={index} />
                  ))}
                </ListView>
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
    order_history_from_customer: state.orderReducer.order_history_from_customer
  };
};

const mapDispatchToProps = {
  getOrderHistoryFromCustomer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderList));
