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
      var originName = $('#originName').val();
      var destName = $('#destName').val();

      //Geocode source and destination
      geocode(originName, destName); 

      //Prevent form from submitting before it's done geocoding
      e.preventDefault();
    }
  }

function geocode(origin, destination){
    var geocoder = new google.maps.Geocoder();

    //Since geocoder requires a callback, we must wait until both are done
    //Henceforth, Pyramid of doom.
    geocoder.geocode({address: origin}, function(originResults, status){
      geocoder.geocode({address: destination}, function(destResults, status){
        var originName = originResults[0].formatted_address,
            originLat  = originResults[0].geometry.location.lat(),
            originLng  = originResults[0].geometry.location.lng(),
            destName   = destResults[0].formatted_address,
            destLat    = destResults[0].geometry.location.lat(),
            destLng    = destResults[0].geometry.location.lng();
  
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


})();