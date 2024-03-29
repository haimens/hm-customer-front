import React, { Component } from "react";
import { connect } from "react-redux";
import "./GAutoComplete.css";
class GAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchAddress: null
    };
  }

  _getAddress = address => {
    this.props.getAddress(address);
  };

  render() {
    return (
      <PlacesWithStandaloneSearchBox
        iconFront={this.props.iconFront}
        _getAddress={this._getAddress}
        inputClass={this.props.inputClass}
        placeholder={this.props.placeholder}
        disablePlaceHolder={this.props.disablePlaceHolder}
        defaultValue={this.props.defaultValue}
        giveId={this.props.giveId}
      />
    );
  }
}

export default connect(
  null,
  {}
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
    {props.places[0] && props._getAddress(props.places)}
    <StandaloneSearchBox ref={props.onSearchBoxMounted} bounds={props.bounds} onPlacesChanged={props.onPlacesChanged}>
      <div className="input-group ">
        {props.iconFront && (
          <div className="input-group-prepend ">
            <span className="input-group-text border-0 bg-white text-secondary-color" id="basic-addon2">
              <i className="fas fa-map-marker-alt" />
            </span>
          </div>
        )}
        <input
          className={`form-control hm-input-height  border-0 ${!props.iconFront && "google-input"}`}
          type="text"
          placeholder={props.disablePlaceHolder ? "" : props.placeholder}
          defaultValue={props.defaultValue}
          id={props.giveId}
        />
        {!props.iconFront && (
          <div className="input-group-prepend ">
            <span className="input-group-text bg-white border-0 addon-color" id="basic-addon1">
              <i className="fas fa-map-marker-alt" />
            </span>
          </div>
        )}
      </div>
    </StandaloneSearchBox>
  </>
));
