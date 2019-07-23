import React from "react";
import "./LoaderAlt.css";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export default class LoaderAlt extends React.Component {
  render() {
    return (
      <main>
        <section style={styles.overlay} />
        <section style={styles.container} className="shadow-sm">
          <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1" />
            <div className="sk-cube sk-cube2" />
            <div className="sk-cube sk-cube3" />
            <div className="sk-cube sk-cube4" />
            <div className="sk-cube sk-cube5" />
            <div className="sk-cube sk-cube6" />
            <div className="sk-cube sk-cube7" />
            <div className="sk-cube sk-cube8" />
            <div className="sk-cube sk-cube9" />
          </div>
          <div className="text-center">{this.props.message || "Loading..."}</div>
        </section>
      </main>
    );
  }
  componentDidMount() {
    this.targetElement = document.getElementsByName("body");
    disableBodyScroll(this.targetElement);
  }
  componentWillUnmount() {
    this.targetElement = document.getElementsByName("body");
    enableBodyScroll(this.targetElement);
  }
}

const styles = {
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(15,15,15,0.2)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: "8888"
  },
  container: {
    position: "fixed",
    backgroundColor: "#fff",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "auto auto",
    width: "300px",
    height: "300px",
    zIndex: "8889"
  }
};
