import GoogleMapReact from 'google-map-react';
import React from 'react';
import env from "dotenv"
env.config()

const Map = (props) =>{ 
    
  const containerStyle = { 
    height: "80vh",
    width: "100%",
  };
  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };

  return( 
    <div style={containerStyle}>
      <GoogleMapReact 
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP }}
        defaultCenter={defaultLatLng}
        defaultZoom={8}
        onClick={props.setLatLng}
        onGoogleApiLoaded={props.handleApiLoaded}
      >
      </GoogleMapReact>
    </div>
  );
}
export default Map;