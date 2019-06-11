import React, { Component } from "react";
import Nav from "../nav/Nav.component";
import Footer from "../nav/Footer.component";
class Main extends Component {
  render() {
    return (
      <section>
        <div>
          <Nav outerClass={"haimens-main-bgColor"}  navTextColor={"text-white"} outlineButton={`haimens-main-button-white-outline`} />
        </div>
        <div>{this.props.children}</div>
        <div>
          <Footer />
        </div>
      </section>
    );
  }
}
export default Main;
