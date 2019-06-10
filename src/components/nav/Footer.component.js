import React, { Component } from 'react';
import './Footer.component.css';

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer font-small footer-index shadow haimens-main-bgColor py-4">
        <div className="footer-copyright text-center text-white footer-text ">
          Copyright 2019, Sunshire Shuttle Inc. All rights reserved.
        </div>
      </footer>
    )
  }
}

export default Footer;