/* global google */
/* jshint quotmark:false */

(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    $('#add').click(addAdditionalStop);

    //Origin and Destination variables
    var $coordinates = $('.coordinates'),
           waypoints = [],
              origin = new google.maps.LatLng($coordinates.attr('data-olat'), $coordinates.attr('data-olng')),
         destination = new google.maps.LatLng($coordinates.attr('data-dlat'), $coordinates.attr('data-dlng'));



    //Convert stops to waypoints for Google Maps
    if(!waypoints.length){
      waypoints = waypoints.map(function(div){
        var lat  = $(div).attr('data-lat'),
        lng  = $(div).attr('data-lng');
        return {location: new google.maps.LatLng(lat, lng)};
      });
    }

    initialize(origin, destination, waypoints);


  });

  function addAdditionalStop(){
    var $input = "<input class='form-control' type='text' name='stop'/>";
    $('#stops').append($input);
  }

  function initialize(origin, destination, stops){

    var styles = [{'featureType':'water','stylers':[{'color':'#021019'}]},{'featureType':'landscape','stylers':[{'color':'#08304b'}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#0c4152'},{'lightness':5}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#0b434f'},{'lightness':25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#0b3d51'},{'lightness':16}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'}]},{'elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'elementType':'labels.text.stroke','stylers':[{'color':'#000000'},{'lightness':13}]},{'featureType':'transit','stylers':[{'color':'#146474'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#144b53'},{'lightness':14},{'weight':1.4}]}],
    options = {
      zoom: 2,
      center: origin,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: styles
    },
    //Display driving directions
    directionsService = new google.maps.DirectionsService();

    //Set map equal to google.maps.Map, give it an ID to attach to and some options to see it up with
    map = new google.maps.Map(document.getElementById('map'), options);

    //Render options specific to directionsDisplay. E.G. the lines on the map
    var rendererOptions = {map: map},
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions),
    request = {
      origin: origin,
      destination: destination,
      waypoints: stops,
      optimizeWaypoints: false,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    //Set panel for Google Directions Service
    directionsDisplay.setPanel(document.getElementById('directions'));

    //Sends our request to directionsService where it will tell us if we're crazy or not
    directionsService.route(request, function(response, status){
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
