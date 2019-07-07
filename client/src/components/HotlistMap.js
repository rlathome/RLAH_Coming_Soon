import React, { Component } from 'react';
import GoogleMap from "react-google-map";
import GoogleMapLoader from "react-google-maps-loader";
const google = window.google;
const MY_API_KEY = "AIzaSyDG_S6mYfRJsrvTX_aRuz3pwiLMouOny6g" // fake


class HotlistMap extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let pt_center = {lat:38.893534,lng:-77.0215994};
    const marcelMapType = new google.maps.StyledMapType(
      [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#e9e9e9"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#deebd8"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#c4e5f3"
                },
                {
                    "visibility": "on"
                }
            ]
        }
      ],
      {name: 'Styled Map'}
    );
    return(
      <div className='hotlist_map_container'>
        <div className='hotlist_object'>
          <GoogleMap
            googleMaps = {this.props.googleMaps}
            coordinates ={[
              {
                title:'',
                position:{
                  lat:0,
                  lng:0
                },
                onLoaded: (googleMaps, map, marker) => {

                  // Set Marker animation
                  marker.setAnimation(googleMaps.Animation.DROP)
                  map.mapTypes.set('styled_map',marcelMapType);
                  map.setMapTypeId('styled_map');
                }
              }

            ]}
            center = {pt_center}
            zoom = {11}

            onLoaded = {
              (googleMaps,map)=>{
                var goo = google.maps,
                service = new goo.places.PlacesService(map),
                request,
                markers=[];
              }
          }
          />
        </div>
      </div>
    );
  }
}
export default GoogleMapLoader(HotlistMap, {
  libraries: ["places"],
  key: MY_API_KEY
});
