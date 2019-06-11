import React, { Component } from "react";
import "./Order.container.css";
import OrderPagination from "./order.component/OrderPagination.component";
import OrderStepFirstComponent from "./order.component/OrderStepFirst.component";

class Order extends Component {
  state = {
    position: 0
  };
  handlePositionChange = position => {
    this.setState(states => ({ position: states.position + position }));
  };
  render() {
    const { position } = this.state;
    return (
      <section>
        <div className="col-10 mx-auto order-header-margin">
          <OrderPagination position={this.handlePositionChange} />
        </div>
        <hr className="haimens-main-bgColor" />
        {position === 0 && <OrderStepFirstComponent />}
      </section>
    );
  }
}

export default Order;
