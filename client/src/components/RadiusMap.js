import React, {Component} from "react"

import GoogleMap from "react-google-map";
import GoogleMapLoader from "react-google-maps-loader";
// let markers = this.props.markers;
const google = window.google;

const MY_API_KEY = "AIzaSyDG_S6mYfRJsrvTX_aRuz3pwiLMouOny6g" // fake

class RadiusMap extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let pt_center = {lat:38.909543,lng:-77.037441};
    // console.log('the markerz: ',pt_center,pt_center.lat>0,pt_center.lat==0);

    let listing_marker = {title:"DuPont Circle",position:{lat:38.910136,lng: -77.042510}};
    let out_of_bounds = this.props.out_of_bounds;
    let not_out_of_bounds = this.props.not_out_of_bounds;
    let address_entered = this.props.address_entered;
      return(
      // GoogleMap component has a 100% height style.
      // You have to set the DOM parent height.
      // So you can perfectly handle responsive with differents heights.
      <div className="listing-map-object">
        <GoogleMap
          googleMaps={this.props.googleMaps}
          // You can add and remove coordinates on the fly.
          // The map will rerender new markers and remove the old ones.
          // coordinates = {markers}
          coordinates={[
            {
              title: "Toulouse",
              position: {
                lat: 43.604363,
                lng: 1.443363,
            },
            onLoaded: (googleMaps, map, marker) => {

              // Set Marker animation
              marker.setAnimation(googleMaps.Animation.DROP)

            },
            }
          ]}
          center={pt_center}
          zoom={12}
          onLoaded={(googleMaps, map) => {

            // Create two circles and test if marker is within them:

            var duPont = new google.maps.Circle({
              center:{lat:38.9101361,lng:-77.04250990000003},
              radius:3218.69,
              strokeColor:'rgba(100,100,100,1)',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: 'rgb(53,202,252)',
              fillOpacity: 0.2
            });
            duPont.setMap(map);
            var rhodeIsland = new google.maps.Circle({
              center:{lat:38.9089377,lng:-77.03237089999999},
              radius:3218.69,
              strokeColor:'rgba(100,100,100,1)',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: 'rgb(53,202,252)',
              fillOpacity: 0.1
            });
            rhodeIsland.setMap(map);
            // // Bias the SearchBox results towards current map's viewport.
            // map.addListener('bounds_changed', function() {
            //     searchBox.setBounds(map.getBounds());
            // });

            function initAutocomplete() {

              // Create the search box and link it to the UI element.
              var input = document.getElementById('pac-input');
              var searchBox = new google.maps.places.SearchBox(input);

              // Bias the SearchBox results towards current map's viewport.
              map.addListener('bounds_changed', function() {
               searchBox.setBounds(map.getBounds());
              });

              var markers = [];
              // Listen for the event fired when the user selects a prediction and retrieve
              // more details for that place.
              searchBox.addListener('places_changed', function() {
               address_entered();
               var places = searchBox.getPlaces();

               if (places.length == 0) {
                 return;
               }

               // Clear out the old markers.
               markers.forEach(function(marker) {
                 marker.setMap(null);
               });
               markers = [];

               // For each place, get the icon, name and location.
               var bounds = new google.maps.LatLngBounds();
               places.every(function(place) {
                 console.log(place,' is one of ',places.length, ' in places')
                 out_of_bounds();
                 var icon = {
                   url: place.icon,
                   size: new google.maps.Size(71, 71),
                   origin: new google.maps.Point(0, 0),
                   anchor: new google.maps.Point(17, 34),
                   scaledSize: new google.maps.Size(25, 25)
                 };

                 // Create a marker for each place.
                 markers.push(new google.maps.Marker({
                   map: map,
                   icon: icon,
                   title: place.name,
                   position: place.geometry.location
                 }));


                 const va = new RegExp('VA');
                 if(va.test(place.formatted_address)){
                   console.log('its in VA')
                   return false;
                 }else{
                   console.log('its in DC')
                 }

                 if (place.geometry.viewport) {
                   // Only geocodes have viewport.
                   bounds.union(place.geometry.viewport);
                 } else {
                   bounds.extend(place.geometry.location);
                 }
                 const lat = place.geometry.location.lat();
                 const lng = place.geometry.location.lng();
                 if(duPont.getBounds().contains({lat,lng}) && rhodeIsland.getBounds().contains({lat,lng})){
                   console.log('hell yeah')
                   not_out_of_bounds();
                   return true;
                 }else{
                  console.log('this marker is out!!')
                  out_of_bounds();
                  return false;
                 }
               });
                // zoom in or out to include all markers
                // map.fitBounds(bounds);
              });
            }
            initAutocomplete();
          }}
        />
      </div>
    )
  }
}


export default GoogleMapLoader(RadiusMap, {
  libraries: ["places"],
  key: MY_API_KEY
});
