/* global google */
/* jshint camelcase:false, quotmark:false*/

(function(){
  'use strict';

  $(document).ready(function(){
    $('form').submit(addTrip);
  });


  function addTrip(e){
    var olat = $('#originLat').val(),
        dlat = $('#destLat').val();

    //If olat and dlat are null/undefined, we need to change that.
    //Without this if statement, the document will submit before information is received
    if(!olat && !dlat){
      //Grab source and destination
      var originName = $('#originName').val(),
      destName = $('#destName').val();

      //Geocode source and destination
      geocode(originName, destName);

      //Prevent form from submitting before it's done geocoding
      e.preventDefault();
    }
  }

  function geocode(origin, destination){
    var geocoder = new google.maps.Geocoder();

    //Since geocoder requires a callback, we must wait until both are done
    //Henceforth, Pyramid of Doom.
    geocoder.geocode({address: origin}, function(originResults, status){
      geocoder.geocode({address: destination}, function(destResults, status){
        var originName = originResults[0].formatted_address,
            originLat  = originResults[0].geometry.location.lat(),
            originLng  = originResults[0].geometry.location.lng(),
            destName   = destResults[0].formatted_address,
            destLat    = destResults[0].geometry.location.lat(),
            destLng    = destResults[0].geometry.location.lng();

        getDistance({lat: originLat, lng: originLng}, {lat: destLat, lng: destLng});

        //Update origin before submit
        $('#originName').val(originName);
        $('#originLat').val(originLat);
        $('#originLng').val(originLng);

        //Update destination before submit
        $('#destName').val(destName);
        $('#destLat').val(destLat);
        $('#destLng').val(destLng);

        //Submit the form
        $('form').submit();
      });
    });
  }

  function getDistance(o, d){
  //Set origin and destination, turn them into floats because Google requires it to be a number
    var origin = new google.maps.LatLng(parseFloat(o.lat), parseFloat(o.lng)),
    destination = new google.maps.LatLng(parseFloat(d.lat), parseFloat(d.lng)),
    service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }, function(results, response){

        var distance = results.rows[0].elements[0].distance.text;
        distance = distance.split(' mi').join('').split(',').join('');

        //Update value of distance in HTML before submitted
        $('#distance').val(distance);
      });

  }

})();
