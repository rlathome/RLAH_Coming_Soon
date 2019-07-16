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
    const { googleMaps, after_tour, after_tour_md, after_tour_va } = this.props;
    console.log('after tour in map: ',after_tour);
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
                  map.mapTypes.set('styled_map',marcelMapType);
                  map.setMapTypeId('styled_map');


                }
              }

            ]}
            center = {pt_center}
            zoom = {11}

            onLoaded = {
              (googleMaps,map,marker)=>{
                // Set Marker animation

                var goo = google.maps,
                service = new goo.places.PlacesService(map),
                request,
                markers=[];
                var service = new goo.places.PlacesService(map);
                var geocoder = new goo.Geocoder();
                var infowindow = new goo.InfoWindow();
                var bounds = new google.maps.LatLngBounds();
                var nextAddress = 0;
                let delay = 100;

                var locations = after_tour.concat(after_tour_va).concat(after_tour_md);
                console.log('after tour in MAP ',locations)

                function createMarker(add,lat,lng) {
                  var contentString = add;
                  var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat,lng),
                    map: map,
                          });
                marker.setAnimation(googleMaps.Animation.DROP);
                 google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(contentString);
                    infowindow.open(map,marker);
                  });

                  bounds.extend(marker.position);

                }
                function geocodeAddress(address, next) {
                  geocoder.geocode({address:address}, function (results,status)
                    {
                       if (status == google.maps.GeocoderStatus.OK) {
                        var p = results[0].geometry.location;
                        //console.log('GEO LOC - ',p)
                        var lat=p.lat();
                        var lng=p.lng();
                        createMarker(address,lat,lng);
                      }
                      else {
                         if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                          nextAddress--;
                          delay++;
                          //console.log('delay NOW - ',delay)
                        } else {
                                      }
                      }
                      next();
                    }
                  );
                }
                function theNext() {

                  if(nextAddress < locations.length){
                    setTimeout(()=>{
                      geocodeAddress(locations[nextAddress].address,theNext);
                      nextAddress++;
                    },delay);

                  }else{
                    map.fitBounds(bounds);
                  }
                }
                
                theNext();
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
