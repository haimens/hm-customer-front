import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import { loadUserInfo } from "../../actions/localStorage.action";
import { LoaderAlt, SuccessModal } from "./index";

export const UnProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <div>
          {rest.isLoading && <LoaderAlt />}
          {rest.isSuccess && <SuccessModal />}
          <Component {...props} />
        </div>
      );
    }}
  />
);

const mapStateToProps = state => {
  return {
    isLoading: state.loadReducer.loading,
    isSuccess: state.loadReducer.is_success
  };
};

export default withRouter(connect(mapStateToProps)(UnProtectedRoute));
