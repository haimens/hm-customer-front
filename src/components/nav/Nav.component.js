import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditCustomer from "./EditCustomer.modal";
import { SuccessModal } from "../shared";
import { logoutFromSystem, resetPassword } from "../../actions/auth.action";
import { getCustomerDetail, updateCustomerInfo } from "../../actions/customer.action";
import "./Nav.css";
import alertify from "alertifyjs";
class Nav extends Component {
  state = {
    showEditUserInfo: false
  };
  signIn = () => {
    this.props.history.push("/login");
  };
  handleChangePassword = () => {
    this.props.resetPassword(localStorage.getItem("username"));
    alertify.notify(
      "The password reset email has been sent to your on-file email address.",
      "The password reset email has been sent to your on-file email address.",
      5
    );
  };
  handleLogOut = () => {
    this.props.logoutFromSystem();
  };
  handleShowEditInfo = () => {
    this.setState(state => ({ showEditUserInfo: !state.showEditUserInfo }));
  };
  render() {
    const { showEditUserInfo } = this.state;
    const { getCustomerDetail, customer_detail_in_customer, updateCustomerInfo, isSuccess } = this.props;
    return (
      <nav
        className={`navbar navbar-expand-lg navbar-light nav-bg p-3 mobile-nav-bacground  ${this.props.outerClass}`}
        style={{ zIndex: 1 }}
      >
        {isSuccess && <SuccessModal />}
        {showEditUserInfo && (
          <EditCustomer
            updateCustomerInfo={updateCustomerInfo}
            customer_detail_in_customer={customer_detail_in_customer}
            getCustomerDetail={getCustomerDetail}
            onClose={this.handleShowEditInfo}
          />
        )}
        <button
          className="navbar-toggler bg-white"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`navbar-brand text-purple hm-pointer-cursor`} onClick={() => this.props.history.push("/")}>
          <img
            src={`${process.env.REACT_APP_LOGO_PATH}`}
            alt={`${process.env.REACT_APP_LOGO_PATH}`}
            className="ml-5"
            style={{ height: "40px" }}
          />
        </div>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ml-sm-auto mt-2 mt-lg-0 mr-sm-5 mx-0">
            <li className="nav-item mr-sm-5 mr-0">
              <div
                className={`nav-link text-center hm-main-text-16 mobile-nav-text hm-pointer-cursor ${
                  this.props.navTextColor
                }`}
                onClick={() => this.props.history.push("/")}
              >
                Book A Trip
              </div>
            </li>
            <li className="nav-item mr-sm-5 mr-0">
              <div
                className={`nav-link text-center hm-main-text-16 mobile-nav-text hm-pointer-cursor ${
                  this.props.navTextColor
                }`}
                onClick={() => this.props.history.push("/about")}
              >
                About Us
              </div>
            </li>
            <li className="nav-item mr-sm-5 mr-0">
              <div
                className={`nav-link text-center hm-main-text-16 mobile-nav-text hm-pointer-cursor ${
                  this.props.navTextColor
                }`}
                onClick={() => this.props.history.push("/contact")}
              >
                Contact Us
              </div>
            </li>
            <li className="nav-item mr-sm-5 mr-0 d-flex justify-content-center ">
              {!localStorage.getItem("user_token") && (
                <button
                  className={`btn ${this.props.outlineButton} px-4 hm-main-text-16 mobile-nav-text ${
                    this.props.navTextColor
                  }`}
                  onClick={this.signIn}
                >
                  Sign In
                </button>
              )}

              {localStorage.getItem("user_token") && (
                <div className="btn-group mr-2">
                  <div className="d-flex flex-column justify-content-center d-lg-none d-flex">
                    <div
                      className={`nav-link text-center hm-main-text-16 mobile-nav-text hm-pointer-cursor ${
                        this.props.navTextColor
                      }`}
                      onClick={() => {
                        this.props.history.push("/order/list");
                      }}
                    >
                      Booking History
                    </div>
                    <div
                      className={`nav-link text-center hm-main-text-16 mobile-nav-text hm-pointer-cursor ${
                        this.props.navTextColor
                      }`}
                      onClick={this.handleShowEditInfo}
                    >
                      Edit Info
                    </div>
                    <div
                      className={`nav-link text-center hm-main-text-16 mobile-nav-text hm-pointer-cursor ${
                        this.props.navTextColor
                      }`}
                      onClick={() => {
                        this.handleChangePassword();
                      }}
                    >
                      Change Password
                    </div>
                    <div
                      className={`nav-link text-center hm-main-text-16 mobile-nav-text hm-pointer-cursor ${
                        this.props.navTextColor
                      }`}
                      onClick={() => {
                        this.handleLogOut();
                      }}
                    >
                      Log Out
                    </div>
                  </div>
                  <div className=" d-none d-lg-block ">
                    <button
                      type="button"
                      className="btn dropdown-toggle hm-main-text-16 mobile-nav-text  ml-2 d-flex align-items-center"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {localStorage.getItem("username").toUpperCase()}
                    </button>
                    <div className="dropdown-menu shadow-sm p-3">
                      <div className="pb-2">Welcome!</div>
                      <div>
                        <button
                          className="dropdown-item px-0 d-flex justify-content-start align-items-center"
                          type="button"
                          onClick={() => {
                            this.props.history.push("/order/list");
                          }}
                        >
                          <small>
                            <img
                              src={`${process.env.PUBLIC_URL}/img/icon_history.svg`}
                              alt={`${process.env.PUBLIC_URL}/img/icon_history.svg`}
                              style={{ width: "12.25px" }}
                              className="mr-3"
                            />
                          </small>
                          Booking history
                        </button>
                      </div>
                      <div>
                        <button
                          className="dropdown-item px-0 d-flex justify-content-start align-items-center"
                          type="button"
                          onClick={this.handleShowEditInfo}
                        >
                          <small>
                            <i className="fas fa-user mr-3" />
                          </small>
                          Edit Info
                        </button>
                      </div>
                      <div>
                        <button
                          className="dropdown-item px-0"
                          type="button"
                          onClick={() => {
                            this.handleChangePassword();
                          }}
                        >
                          <small>
                            <i className="fas fa-unlock-alt mr-3" />
                          </small>
                          Change Password
                        </button>
                      </div>
                      <div>
                        <hr />
                        <button
                          className="dropdown-item p-0"
                          type="button"
                          onClick={() => {
                            this.handleLogOut();
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <small>
                              <img
                                src={`${process.env.PUBLIC_URL}/img/icon_logout.svg`}
                                alt={`${process.env.PUBLIC_URL}/img/icon_logout.svg`}
                                className="mr-3"
                              />
                            </small>
                            Log Out
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    customer_detail_in_customer: state.orderReducer.customer_detail_in_customer,
    isLoading: state.loadReducer.loading,
    isSuccess: state.loadReducer.is_success
  };
};

const mapDispatchToProps = {
  logoutFromSystem,
  getCustomerDetail,
  updateCustomerInfo,
  resetPassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Nav));
