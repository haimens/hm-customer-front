import React, { Component } from "react";

class GMapLocation extends Component {
  constructor(props) {
    super(props);
    this.autocomplete = null;
    this.state = {
      directions: "null"
    };
  }

  _getResult = result => {
    console.log(result);
  };
  render() {
    return <MapWithADirectionsRenderer _getResult={this._getResult} position={this.props.position} />;
  }
}

const { compose, withProps, lifecycle } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_MAP_API
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(this.props.position.origin.lat, this.props.position.origin.lng),
          destination: new window.google.maps.LatLng(
            this.props.position.destination.lat,
            this.props.position.destination.lng
          ),
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  })
)(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={new window.google.maps.LatLng(props.position.center.lat, props.position.center.lng)}
  >
    {props.directions && props._getResult(props.directions.routes[0].legs[0])}
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

export default GMapLocation;
