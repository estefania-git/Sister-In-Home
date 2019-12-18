import React, { Component, history } from "react";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

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
  height: "70%"
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    mamis: [],
    sisters: []
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
    }).then(Axios.get("http://localhost:5000/api/auth/sisters").then(sistersFromDB => {
      this.setState({
        ...this.state,
        sisters: sistersFromDB.data
      });
  }))
}

  render() {
    return (
      <>
      <div className="map">
        {/* <button id="go-back" onClick={() => history.goBack()}>Go back</button> */}
        <Map
          id="map"
          google={this.props.google}
          style={style}
          // onReady={this.fetchPlaces}
          // visible={false}
          initialCenter={{
            lat: 40.392303,
            lng: -3.6996187
          }}
          zoom={15}
          onClick={this.onMapClicked}
        >
          {this.props.user.role === "Sister" &&
            this.state.mamis.map((mami, idx) => {
              return (
                <Marker
                  onClick={this.onMarkerClick}
                  name={mami.username}
                  position={{
                    lat: mami.geo.coordinates[0],
                    lng: mami.geo.coordinates[1]
                  }}
                  key={idx}
                />
              );
            })}
          {this.props.user.role === "Mami" &&
            this.state.sisters.map((sister, idx) => {
              return (
                <Marker
                  onClick={this.onMarkerClick}
                  name={sister.username}
                  position={{
                    lat: sister.geo.coordinates[0],
                    lng: sister.geo.coordinates[1]
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
        <div>
          </div>
        
          {this.props.user.role === "Sister" &&
            this.state.mamis.map(mami => {
              return (
                
              
                <div className="div-map">
                    <Card>
                      <CardImg top width="100%" src={mami.picture} alt="Card image cap" />
                      <CardBody>
                      <CardTitle className="CardTitle"> <h1>{mami.username} </h1></CardTitle>
                        
                      <CardText><h3>{mami.description}</h3></CardText>
                        <Button onClick="">Chat with {mami.username}</Button>
                      </CardBody>
                    </Card>
                    <br/>
                  </div>
                  
                 
              );
            })}
        
       
          {this.props.user.role === "Mami" &&
            this.state.sisters.map(sister => {
              return (
                
                  <div className="div-map">
                    <Card>
                      <CardImg top width="100%" src={sister.picture} />
                      <CardBody>
                      <CardTitle className="CardTitle"> <h1>{sister.username}</h1></CardTitle>
                      <CardText><h3>{sister.description}</h3></CardText>
                        <Button onClick="">Chat with {sister.username}</Button>
                      </CardBody>
                    </Card>
                  <br />
                  </div>
                 
                  
                
              );
            })}
        </div>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);
