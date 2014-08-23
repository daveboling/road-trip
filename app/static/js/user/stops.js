/* global google */

(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    $('#add').click(addAdditionalStop);

    //Convert waypoints to Google Map waypoints
    var waypoints = waypoints.map(function(div){
      var lat  = $('.coordinates').attr('data-lat'),
      lng  = $('.coordinates').attr('data-lng');
      return {location: new google.maps.LatLng(lat, lng)};
    });

    initialize(waypoints);


  });

  function addAdditionalStop(){

  }

  function initialize(wps){
    var origin        = wps.shift(),
        destination   = wps.pop(),
    directionsService = new google.maps.DirectionsService(),
    directionsDisplay = new google.maps.DirectionsRenderer(),
               styles = [{'featureType':'water','stylers':[{'color':'#021019'}]},{'featureType':'landscape','stylers':[{'color':'#08304b'}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#0c4152'},{'lightness':5}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#0b434f'},{'lightness':25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#0b3d51'},{'lightness':16}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'}]},{'elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'elementType':'labels.text.stroke','stylers':[{'color':'#000000'},{'lightness':13}]},{'featureType':'transit','stylers':[{'color':'#146474'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#144b53'},{'lightness':14},{'weight':1.4}]}],
    options = {
      zoom: 2,
      center: wps[0].location,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: styles
    };

    //Set map equal to google.maps.Map, give it an ID to attach to and some options to see it up with
    map = new google.maps.Map(document.getElementById('map'), options);

    //Render options specific to directionsDisplay. E.G. the lines on the map
    var rendererOptions = {map: map};
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

    //Format the request to directions service
    var request = {
      origin: origin.location,
      destination: destination.location,
      waypoints: wps,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    //Sends our request to directionsService where it will tell us if we're crazy or not
    directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
          else {
          console.log(status);
          console.log(response);
        }
        });
  }

})();