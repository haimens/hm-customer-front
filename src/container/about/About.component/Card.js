import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className="d-flex">
        <div className="badge badge-secondary haimens-main-text-14 haimens-main-bgColor p-2 rounded-0 my-auto">
          {this.props.number}
        </div>
        <div className="ml-4">
          <h3 className="haimens-main-text-16 mt-3">{this.props.title}</h3>
          <p className="haimens-main-text-14">{this.props.paragraph}</p>
        </div>
      </div>
    );
  }
}
export default Card;
