import React, { Component } from "react";
import "./MainCard.css";
export default class mainCard extends Component {
  render() {
    return (
      <div className="card border-0 align-middle">
        <img
          src={`${process.env.PUBLIC_URL}/img/haimensMain.png`}
          alt="head"
          className="card-size rounded-circle ml-auto mr-auto"
        />
        <p className="mt-4 hm-main-textColor hm-main-text-18 ">{this.props.title}</p>
        <p className="mt-2 hm-main-text-14">{this.props.paragraph}</p>
      </div>
    );
  }
}
