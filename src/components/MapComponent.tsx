import React, { Component } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import { popupContent, popupHead, popupText } from './popupStyles';


interface MapComponentProps {
  incidents: any;
}

interface MapComponentState {
  lat: number;
  lng: number;
  zoom: number;
  firstElem: number;
  disabled: boolean;
  currentIncident: any;
}


export default class MapComponent extends Component<MapComponentProps, MapComponentState> {
  markerRefs: any;

  constructor(props: MapComponentProps) {
    super(props);
    this.state = {
      lat: 37.7749,
      lng: -122.4194,
      zoom: 13,
      firstElem: 0,
      disabled: true,
      currentIncident: null,
    };

    this.markerRefs = []
  }

  clickMarker = (incidentId: number) => {
    let incident = this.props.incidents.find((item: any) => item.id === incidentId);
    this.setState({
      currentIncident: incident,
      disabled: false,
    });
  }

  openPopup(marker: any, id: number) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.openPopup(id);
    }
  }

  actionsSlider = (buttonId: string) => {
    let incidents: any = this.props.incidents,
      currentIndex: number = incidents.indexOf(this.state.currentIncident),
      newIndex: number;

    if (currentIndex === incidents.length - 1) {
      buttonId === 'next' ?
        newIndex = 0
        : newIndex = currentIndex - 1;
    } else if (currentIndex === this.state.firstElem) {
      buttonId === 'next' ?
        newIndex = currentIndex + 1
        : newIndex = incidents.length - 1;
    } else {
      buttonId === 'next' ?
        newIndex = currentIndex + 1
        : newIndex = currentIndex - 1;
    }

    this.setState({
      currentIncident: incidents[newIndex],
    });
    this.markerRefs[incidents[newIndex].id].openPopup();
  }

  render() {
    return (
      this.props.incidents ?
        <div>
          <MapContainer
            center={[this.state.lat, this.state.lng]}
            zoom={this.state.zoom}
            style={{ width: '100%', height: '900px' }}
          >
            <TileLayer
              attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              this.props.incidents.map((incident: any) => {
                const point: any = [incident.point.coordinates[1],
                incident.point.coordinates[0]];

                return (
                  <Marker eventHandlers={{
                    click: () => this.clickMarker(incident.id),
                  }}
                    position={point}
                    key={incident.incident_number}
                    ref={ref => this.markerRefs[incident.id] = ref}
                  >
                    <Popup>
                      <div style={popupContent}>
                        <div style={popupHead}>ADDRESS:</div>
                        <span style={popupText}>
                          {incident.address}, {incident.city}
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                )
              })
            }
          </MapContainer>
          {<div className="slider-buttons">
            <button
              id='prev'
              disabled={this.state.disabled}
              onClick={(e: any) => this.actionsSlider(e.target.id)}>
            </button>
            {
              this.state.currentIncident ?
                <div className="currentTag">
                  Current tag: {this.state.currentIncident.address}
                </div>
                : <div>No current tag</div>
            }
            <button
              id='next'
              disabled={this.state.disabled}
              onClick={(e: any) => this.actionsSlider(e.target.id)}>
            </button>
          </div>}
        </div>
        : 'Data is loading...'
    )
  }
}
