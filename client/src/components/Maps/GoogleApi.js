import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
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
  height: "60%"
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    mamis: [],
    sisters: []
  };

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

  goChat = () => {
    this.props.history.push("/chat");
  };

  componentDidMount() {
    Axios.get(`${process.env.REACT_APP_API_URL}/auth/mamis`)
      .then(mamisFromDB => {
          Axios.get(`${process.env.REACT_APP_API_URL}/auth/sisters`).then(
            sistersFromDB => {
              this.setState({
                ...this.state,
                sisters: sistersFromDB.data, mamis: mamisFromDB.data
              });
            }
          )
        
      })
  }

  render() {
    return (
      <>
        <div className="map">
          {/* <Map
            id="map"
            google={this.props.google}
            style={style}
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
                <h1> {this.state.selectedPlace.name} </h1>
              </div>
            </InfoWindow>
          </Map>
          <div></div> */}

          {this.props.user.role === "Sister" &&
            this.state.mamis.map(mami => {
              return (
                <div className="div-map">
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src={mami.picture}
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle className="CardTitle">
                        <h1>{mami.username} </h1>
                      </CardTitle>

                      <CardText>
                        <h3>{mami.description}</h3>
                      </CardText>
                      <Link to="/chat">
                        <Button>Chat with {mami.username}</Button>
                      </Link>
                    </CardBody>
                  </Card>
                  <br />
                </div>
              );
            })}

          {this.props.user.role === "Mami" &&
            this.state.sisters.map(sister => {
              return (
                <div className="div-map">
                  <Card className="Card">
                    <CardImg top width="100%" src={sister.picture} />
                    <CardBody>
                      <CardTitle className="CardTitle">
                        <h1>{sister.username}</h1>
                      </CardTitle>
                      <CardText>
                        <h3>{sister.description}</h3>
                      </CardText>
                      <Link to="/chat">
                        <Button>Chat with {sister.username}</Button>
                      </Link>
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


// export default GoogleApiWrapper({
//   apiKey: "AIzaSyDUeQXCyJDlhOtCB8JwWAk8zCxpjk6k-jo"
// })(MapContainer);

export default MapContainer