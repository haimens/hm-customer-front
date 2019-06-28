import React, { Component } from "react";
import Nav from "../nav/Nav.component";
import Footer from "../nav/Footer.component";
class Main extends Component {
  render() {
    return (
      <section>
        <div>
          <Nav
            outerClass={"hm-main-bgColor"}
            navTextColor={"text-white"}
            outlineButton={`hm-main-button-white-outline`}
          />
        </div>
        <div className="py-5">{this.props.children}</div>
        <div className="fixed-bottom">
          <Footer />
        </div>
      </section>
    );
  }
}
export default Main;
