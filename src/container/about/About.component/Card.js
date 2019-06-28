import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className="d-flex">
        <div className="badge badge-secondary hm-main-text-14 hm-main-bgColor p-2 rounded-0 my-auto">
          {this.props.number}
        </div>
        <div className="ml-4">
          <h3 className="hm-main-text-16 mt-3">{this.props.title}</h3>
          <p className="hm-main-text-14">{this.props.paragraph}</p>
        </div>
      </div>
    );
  }
}
export default Card;
