import React, { Component } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import ImageButton from "./ImageButton";
import SearchButton from "./SearchBar";
import "./Modal.css";

/**
 * Modal
 * @showSearchBar bool
 * @onSearch (keywords)
 * @position right || left || center
 * @getHeight str
 * @getWidth str
 * @onClose close function
 * @title title
 * @zIndex adjust zIndex
 * @className (headerContainerClassName, headerTitleClassName)
 */
class Modal extends Component {
  targetElement = null;
  componentDidMount() {
    // 2. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
    this.targetElement = document.querySelector("#onlyScroll");
    disableBodyScroll(this.targetElement);
  }
  componentWillUnmount() {
    // 5. Useful if we have called disableBodyScroll for multiple target elements,
    // and we just want a kill-switch to undo all that.
    // OR useful for if the `hideTargetElement()` function got circumvented eg. visitor
    // clicks a link which takes him/her to a different page within the app.
    clearAllBodyScrollLocks();
  }

  handleClose = e => {
    if (e) e.preventDefault();
    if (this.props.onClose) this.props.onClose();
  };

  handleSearch = keywords => this.setState({ keywords });

  render() {
    let curr = "center";
    if (this.props.position === "right") {
      curr = "modal-right";
    } else if (this.props.position === "left") {
      curr = "modal-left";
    }
    const widthHeight = {
      maxWidth: this.props.getWidth,
      maxHeight: this.props.getHeight,
      minWidth: "320px",
      minHeight: this.props.getHeight,
      zIndex: this.props.zIndex + 1 || 2
    };

    return (
      <main>
        <section
          className="modal-over-lay"
          style={{ zIndex: `${this.props.zIndex || 1}` }}
          onClick={this.handleClose}
        />
        <section className={`${curr} ${this.props.className} rounded-custom`} id="onlyScroll" style={widthHeight}>
          <div
            className={`sticky-top w-100 md-2 border-bottom ${
              this.props.headerContainerClassName ? this.props.headerContainerClassName : "bg-white"
            }`}
          >
            {!this.props.hideHeader && (
              <header className={`d-flex justify-content-between align-items-center px-4 `} style={{ height: "60px" }}>
                <h5 className="text-modal-color font-weight-bold text-modal-title">{this.props.title}</h5>
                <ImageButton
                  // image={`${process.env.PUBLIC_URL}/img/forget-password@2x.png`}
                  icon={<i className="fas fa-times" />}
                  onClick={() => this.handleClose()}
                  outerClassName="text-dark"
                />
              </header>
            )}
            {this.props.showSearchBar && (
              <section className="mt-2 border">
                <SearchButton onSubmit={this.handleSearch} name="search" placeholder="search for ..." />
              </section>
            )}
          </div>
          <div>{this.props.children}</div>
        </section>
      </main>
    );
  }
}

export default Modal;
