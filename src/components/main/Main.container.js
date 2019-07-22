import React, { Component } from "react";
import Nav from "../nav/Nav.component";
import Footer from "../nav/Footer.component";
import "./Main.container.css";
class Main extends Component {
  render() {
    return (
      <section>
        <div>
          <Nav
            outerClass={"linear-background-header"}
            navTextColor={"text-white"}
            outlineButton={`hm-main-button-outline`}
          />
        </div>
        <div>{this.props.children}</div>
        <div className="fixed-bottom">
          <Footer />
        </div>
      </section>
    );
  }
}
export default Main;
