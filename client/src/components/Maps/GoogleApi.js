import React, { Component, history } from "react";

import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Listing
} from "google-maps-react";
import "./GoogleApi.css";
import Axios from "axios";

const style = {
  width: "50%",
  height: "50%"
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    mamis: []
  };

  //  fetchPlaces(mapProps, map) {
  //    const {
  //      google
  //    } = mapProps;
  //    const service = new google.maps.places.PlacesService(map);
  //  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidMount() {
    Axios.get("http://localhost:5000/api/auth/mamis").then(mamisFromDB => {
      this.setState({
        ...this.state,
        mamis: mamisFromDB.data
      });
    });
  }

  render() {
    return (
      
      <>
        {/* <button id="go-back" onClick={() => history.goBack()}>Go back</button> */}
        
        <Map
          id="map"
          google={this.props.google}
          style={style}
          // onReady={this.fetchPlaces}
          // visible={false}
          initialCenter={{
            lat: 40.4167,
            lng: -3.703254
          }}
          zoom={15}
          onClick={this.onMapClicked}
        >
          {this.state.mamis.map((mami, idx) => {
            console.log(mami.geo.coordinates[1]);
            return (
              <Marker
                onClick={this.onMarkerClick}
                name={mami.name}
                position={{
                  lat: mami.geo.coordinates[0],
                  lng: mami.geo.coordinates[1]
                }}
                key={idx}
              />
            );
          })}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1> {this.state.selectedPlace.name} </h1>{" "}
            </div>{" "}
          </InfoWindow>
          {/* <Listing places={this.state.places} /> */}
        </Map>{" "}
        
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);
