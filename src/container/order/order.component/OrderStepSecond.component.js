import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import alertify from "alertifyjs";
import OrderMapDetail from "./orderStepSecond.component/OrderStepSecondDetail.component";
import { parsePrice } from "../../../actions/utilities.action";

class OrderStepSecond extends Component {
  state = {};
  render() {
    return (
      <section className="pt-4 pb-4">
        <div className="col-10 mx-auto">123</div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderStepSecond));
