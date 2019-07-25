import React, { Component } from "react";
import { connect } from "react-redux";

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

  componentDidMount() {
    const { first_local_trip, second_local_trip } = this.props;
    if (first_local_trip !== "" || second_local_trip !== "") {
      this.setState({ position: 2 });
    }
  }

  render() {
    const { position } = this.state;
    return (
      <section>
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
    first_local_trip: state.localReducer.first_local_trip,
    second_local_trip: state.localReducer.second_local_trip
  };
};

export default connect(mapStateToProps)(Order);
