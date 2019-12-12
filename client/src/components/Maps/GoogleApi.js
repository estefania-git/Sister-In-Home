import React, { Component } from "react";

import {Map, InfoWindow, Marker, GoogleApiWrapper, Listing} from 'google-maps-react';
import "./GoogleApi.css"

const style = {
  width: '50%',
  height: '50%',
 }

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
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
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
  
 

  render() {
    return (
      
      <Map id="map" google={this.props.google}
          style={style}
    
      // onReady={this.fetchPlaces}
      // visible={false}
          initialCenter={{
            lat: 40.4167,
            lng: -3.7032540
          }}
        
          zoom={15}
          onClick={this.onMapClicked}>
          
         
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
          {/* <Listing places={this.state.places} /> */}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
    apiKey: (process.env.API_KEY_GOOGLE)
    })(MapContainer)