import React, { Component } from "react";
import "./MainCard.css";
export default class mainCard extends Component {
  render() {
    return (
      <div className="">
        <img
          src={`${process.env.PUBLIC_URL}/img/${this.props.img}`}
          alt="icon"
          style={{ width: "65px", height: "65px" }}
        />
        <p className="mt-4 hm-main-textColor font-weight-bold hm-main-text-18 ">{this.props.title}</p>
        <p className="mt-2 hm-main-text-14 text-grey">{this.props.paragraph}</p>
      </div>
    );
  }
}
