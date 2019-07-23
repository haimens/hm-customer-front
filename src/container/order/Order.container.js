import React, { Component } from "react";
import { Loader } from "../../components/shared";
import { connect } from "react-redux";

import "./Order.container.css";
import OrderPagination from "./order.component/OrderPagination.component";
import OrderStepFirstComponent from "./order.component/OrderStepFirst.component";
import OrderStepSecondComponent from "./order.component/OrderStepSecond.component";
import OrderStepThirdComponent from "./order.component/OrderStepThird.component";
import OrderStepFourthComponent from "./order.component/OrderStepFourth.component";

class Order extends Component {
  state = {
    position: 1
  };
  handleChangePosition = position => {
    this.setState(states => ({ position: states.position + position }));
  };

  render() {
    const { position } = this.state;
    const { isLoading } = this.props;
    return (
      <section>
        {isLoading && <Loader />}
        <OrderPagination position={position} />
        {position === 0 && <OrderStepFirstComponent handleChangePosition={this.handleChangePosition} />}
        {position === 1 && <OrderStepSecondComponent handleChangePosition={this.handleChangePosition} />}
        {position === 2 && <OrderStepThirdComponent handleChangePosition={this.handleChangePosition} />}
        {position === 3 && <OrderStepFourthComponent handleChangePosition={this.handleChangePosition} />}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.loadReducer.loading,
    isSuccess: state.loadReducer.is_success
  };
};

export default connect(mapStateToProps)(Order);
