import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Order.container.css";
import OrderPagination from "./order.component/OrderPagination.component";
import OrderStepFirstComponent from "./order.component/OrderStepFirst.component";
import OrderStepSecondComponent from "./order.component/OrderStepSecond.component";
import OrderStepThirdComponent from "./order.component/OrderStepThird.component";
import OrderStepFourthComponent from "./order.component/OrderStepFourth.component";
import { setTripCreated } from "../../actions/local.action";
class Order extends Component {
  state = {
    position: 0,
    trip_created: false
  };
  handleChangePosition = position => {
    this.setState(states => ({ position: states.position + position }));
  };

  signInFromTrip = async () => {
    await this.props.setTripCreated(true);
  };

  handleGoBack = async () => {
    await this.props.setTripCreated(false);
  };

  componentDidMount() {
    const { trip_been_created } = this.props;
    if (trip_been_created) {
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
        {position === 2 && (
          <OrderStepThirdComponent
            handleGoBack={this.handleGoBack}
            signInFromTrip={this.signInFromTrip}
            handleChangePosition={this.handleChangePosition}
          />
        )}
        {position === 3 && <OrderStepFourthComponent handleChangePosition={this.handleChangePosition} />}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    first_local_trip: state.localReducer.first_local_trip,
    second_local_trip: state.localReducer.second_local_trip,
    trip_been_created: state.localReducer.trip_been_created
  };
};

const mapDispatchToProps = {
  setTripCreated
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Order));
