import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { loadUserInfo } from '../../actions/localStorage.action';
import { LoaderAlt, SuccessModal } from './index'

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const user_token = loadUserInfo('user_token')
      const instance_token = loadUserInfo('instance_token')
      const username = loadUserInfo('username')
      if (user_token && instance_token && username) {
        return (
          <div>
            {rest.isLoading && <LoaderAlt />}
            {rest.isSuccess && <SuccessModal />}
            <Component {...props} />
          </div>

        )
      } else {
        return (<Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }} />)
      }
    }
    }
  />
);

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.login,
    isLoading: state.loadReducer.loading,
    isSuccess: state.loadReducer.is_success
  };
};

export default withRouter(connect(mapStateToProps)(ProtectedRoute));