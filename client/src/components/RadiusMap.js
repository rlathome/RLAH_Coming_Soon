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
    let pt_center = {lat:38.924295,lng:-77.033381};
    // console.log('the markerz: ',pt_center,pt_center.lat>0,pt_center.lat==0);
    const listing_marker = {title:"DuPont Circle",position:{lat:38.910136,lng: -77.042510}};
    let out_of_bounds = this.props.out_of_bounds;
    let not_out_of_bounds = this.props.not_out_of_bounds;
    let address_entered = this.props.address_entered;
    let no_address_entered = this.props.no_address_entered;
      return(
      // GoogleMap component has a 100% height style.
      // You have to set the DOM parent height.
      // So you can perfectly handle responsive with differents heights.
      <div className="listing-map-object">
        <GoogleMap
          googleMaps={this.props.googleMaps}
          // You can add and remove coordinates on the fly.
          // The map will rerender new markers and remove the osld ones.
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

            var goo = google.maps,
            service = new goo.places.PlacesService(map),
            request,
            markers=[];

            // Create two circles and test if marker is within them:

            var duPont = new goo.Circle({
              center:{lat:38.9101361,lng:-77.04250990000003},
              radius:3218.69,
              strokeColor:'rgba(100,100,100,1)',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: 'rgb(53,202,252)',
              fillOpacity: 0.2
            });
            duPont.setMap(map);
            var rhodeIsland = new goo.Circle({
              center:{lat:38.9089377,lng:-77.03237089999999},
              radius:3218.69,
              strokeColor:'rgba(100,100,100,1)',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: 'rgb(53,202,252)',
              fillOpacity: 0.1
            });
            rhodeIsland.setMap(map);
            var smallBrokerage = new goo.Circle({
              center:{lat:38.939687,lng:-77.024657},
              radius:3218.69,
              strokeColor:'rgba(100,100,100,1)',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: 'rgb(53,202,252)',
              fillOpacity: 0.1
            });
            smallBrokerage.setMap(map);
            // // Bias the SearchBox results towards current map's viewport.


            let button = document.getElementById('map-button');

            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');

            var searchBox = new goo.places.SearchBox(input);

            var ac = searchBox;

            function setMapOnAll(map) {
              for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
              }
            }

            // Removes the markers from the map, but keeps them in the array.
            function clearMarkers() {
              setMapOnAll(null);
            }

            goo.event.addDomListener(input, 'keydown', function(event) {
              no_address_entered();
              out_of_bounds();
              clearMarkers();
              initSubmitBtn();
              if (event.keyCode === 13) {
                  event.preventDefault();
              }
            });
            function initPlaces(places){
              // let markers = [];
              // For each place, get the icon, name and location.
              let bounds = new goo.LatLngBounds();
              places.every(function(place) {
                console.log(place,' is one of ',places.length, ' in places')
                out_of_bounds();
                var icon = {
                  url: place.icon,
                  size: new goo.Size(71, 71),
                  origin: new goo.Point(0, 0),
                  anchor: new goo.Point(17, 34),
                  scaledSize: new goo.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new goo.Marker({
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
                if(duPont.getBounds().contains({lat,lng}) || rhodeIsland.getBounds().contains({lat,lng}) || smallBrokerage.getBounds().contains({lat,lng})){
                  console.log('this marker is in!!')
                  not_out_of_bounds();
                  return true;
                }else{
                 console.log('this marker is out!!')
                 out_of_bounds();
                 return false;
                }
              });
            }

            function initSubmitBtn(){

              let button = document.getElementById('map-button');
              // let markers = [];
              button.onclick = function (event) {
                console.log('yeap - ', ac)
                event.preventDefault();

                if (input.value.match(/\S/)) {
                  console.log('factoring')
                  // Clear out the old markers.
                  markers.forEach(function(marker) {
                    marker.setMap(null);
                  });
                  request = {
                    query: input.value
                  };
                  if (ac.getBounds()) {
                    console.log('ac: ',ac)
                    request.bounds = ac.getBounds();
                  }
                  service.textSearch(request, function(places) {
                    //set the places-property of the SearchBox
                    //places_changed will be triggered automatically
                    ac.set('places', places || [])
                  });
                }
              };
            }

            function initAutocomplete() {

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

               initPlaces(places);
                // zoom in or out to include all markers
                // map.fitBounds(bounds);
              });
            }

            initAutocomplete();
            initSubmitBtn();
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
