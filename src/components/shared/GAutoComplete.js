import React, { Component } from "react";
import { connect } from "react-redux";
import { savePickUp, saveDropOff } from "../../actions/location.action";
import "./GAutoComplete.css";
class GAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchAddress: null
    };
  }

  _getAddress = address => {
    if (this.props.placeholder === "PICKUP") {
      this.props.savePickUp(address);
    }
    if (this.props.placeholder === "DROPOFF") {
      this.props.saveDropOff(address);
    }
  };

  render() {
    return (
      <PlacesWithStandaloneSearchBox
        _getAddress={this._getAddress}
        inputClass={this.props.inputClass}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default connect(
  null,
  { savePickUp, saveDropOff }
)(GAutoComplete);

const { compose, withProps, lifecycle } = require("recompose");
const { withScriptjs } = require("react-google-maps");
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_MAP_API
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.setState({
            places
          });
        }
      });
    }
  }),
  withScriptjs
)(props => (
  <>
    {props.places[0] && props._getAddress(props.places[0].formatted_address)}

    <StandaloneSearchBox ref={props.onSearchBoxMounted} bounds={props.bounds} onPlacesChanged={props.onPlacesChanged}>
      <div className="input-group mb-3 ">
        <div className="input-group-prepend ">
          <span className="input-group-text bg-white " id="basic-addon1">
            <i className="fas fa-map-marker-alt addon-color" />
          </span>
        </div>
        <input
          className={`form-control p-1 GAuto-input font-weight-bold haimens-main-text-14 border-left-0 haimens-input-height ${
            props.inputClass
          }`}
          type="text"
          placeholder={props.placeholder || ""}
        />
      </div>
    </StandaloneSearchBox>
  </>
));
