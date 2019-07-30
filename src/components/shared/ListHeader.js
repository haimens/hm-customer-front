import React, { Component } from "react";
import SearchBar from "./SearchBar";
export default class ListHeader extends Component {
  state = {
    whichButton: 2
  };
  handleFirstBeenClicked = () => {
    this.setState({ whichButton: 1 });
    this.props.handleFirstButton();
  };
  handleSecondBeenClicked = () => {
    this.setState({ whichButton: 2 });
    this.props.handleSecondButton();
  };
  handleThirdBeenClicked = () => {
    this.setState({ whichButton: 3 });
    this.props.handleThirdBeenClicked();
  };
  render() {
    let { buttonWidth } = this.props;
    if (!buttonWidth) {
      buttonWidth = "30px";
    }
    return (
      <div
        className={`rounded-custom-top bg-white ${
          !this.props.hideShadow ? "shadow-sm border-bottom-custom" : "border-bottom-custom mb-3"
        }`}
      >
        <section className="d-flex justify-content-between align-items-center py-3 px-4" style={{ height: "65px" }}>
          <h6 className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold ">
            {this.props.parentProps.title}
          </h6>
          {!this.props.hideButton && (
            <button
              className="text-white button-main-background border-0 rounded shadow px-1 py-0 d-flex align-items-center justify-content-center"
              onClick={this.props.parentProps.clickFunction}
              style={{
                height: "28px",
                width: buttonWidth
              }}
            >
              {this.props.parentProps.icon ? (
                <img
                  src={`${process.env.PUBLIC_URL}/img/${this.props.parentProps.icon}`}
                  alt="refresh"
                  className="mr-2"
                />
              ) : (
                <i className="fas fa-plus mr-2" />
              )}
              <div className="font-weight-bold hm-text-12 "> {this.props.parentProps.clickTitle}</div>
            </button>
          )}
          {this.props.showSearch && (
            <div className="d-flex ">
              <div className="mr-3">
                <SearchBar onSubmit={this.props.onSubmit} />
              </div>

              {this.props.showExtra && (
                <>
                  <button
                    className={`mr-3 rounded-custom ${
                      this.state.whichButton === 1
                        ? "button-main-background text-white border-0"
                        : "border-0 bg-white text-purple shadow-sm "
                    }`}
                    style={{ width: "88px", height: "28px" }}
                    onClick={this.handleFirstBeenClicked}
                  >
                    Upcoming
                  </button>
                  <button
                    className={`mr-3 rounded-custom ${
                      this.state.whichButton === 2
                        ? "button-main-background text-white border-0"
                        : "border-0 bg-white text-purple shadow-sm "
                    }`}
                    style={{ width: "88px", height: "28px" }}
                    onClick={this.handleSecondBeenClicked}
                  >
                    Active
                  </button>
                  <button
                    className={`mr-3 rounded-custom ${
                      this.state.whichButton === 3
                        ? "button-main-background text-white border-0"
                        : "border-0 bg-white text-purple shadow-sm "
                    }`}
                    style={{ width: "88px", height: "28px" }}
                    onClick={this.handleThirdBeenClicked}
                  >
                    History
                  </button>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    );
  }
}
