import React, { Component } from "react";
import "./Order.container.css";
import OrderPagination from "./order.component/OrderPagination.component";
import OrderStepFirstComponent from "./order.component/OrderStepFirst.component";
import OrderStepSecondComponent from "./order.component/OrderStepSecond.component";
import OrderStepThirdComponent from "./order.component/OrderStepThird.component";
import OrderStepFourthComponent from "./order.component/OrderStepFourth.component";

class Order extends Component {
  state = {
    position: 0
  };
  handleChangePosition = position => {
    this.setState(states => ({ position: states.position + position }));
  };

  render() {
    const { position } = this.state;
    return (
      <section>
        <div className="col-10 mx-auto order-header-margin">
          <OrderPagination position={position} />
        </div>
        <hr className="haimens-main-bgColor" />
        {position === 3 && <OrderStepFirstComponent handleChangePosition={this.handleChangePosition} />}
        {position === 1 && <OrderStepSecondComponent handleChangePosition={this.handleChangePosition} />}
        {position === 2 && <OrderStepThirdComponent handleChangePosition={this.handleChangePosition} />}
        {position === 0 && <OrderStepFourthComponent handleChangePosition={this.handleChangePosition} />}
      </section>
    );
  }
}

export default Order;
