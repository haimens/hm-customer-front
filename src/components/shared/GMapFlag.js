import React from "react";

class MyFancyComponent extends React.Component {
  render() {
    return (
      <MapWithAMarkerWithLabel
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
          process.env.REACT_APP_GOOGLE_MAP_API
        }&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default MyFancyComponent;

const { compose } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap, Marker } = require("react-google-maps");

const MapWithAMarkerWithLabel = compose(
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 34.1080263, lng: -117.742504 }}
    options={{ disableDefaultUI: true }}
  >
    <Marker position={{ lat: 34.1080263, lng: -117.742504 }} />
  </GoogleMap>
));
