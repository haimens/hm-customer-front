import React, { Component } from "react";
import "./MainCard.css";
export default class mainCard extends Component {
  render() {
    return (
      <div className="card align-middle">
        <img src={`${process.env.PUBLIC_URL}/img/haimensMain.png`} alt="head" className="card-size" />
        <p1>hi</p1>
        <p>Iam lebronjames</p>
      </div>
    );
  }
}
