'use strict';

var mp     = require('multiparty'),
    Trip   = require('../models/trip'),
    moment = require('moment'),
    Stop   = require('../models/stop');

exports.new = function(req, res){
  res.render('trips/new');
};

exports.create = function(req, res){
  var form = new mp.Form();

  form.parse(req, function(err, fields, files){
    Trip.create(fields, files, function(){
      res.redirect('/trips');
    });
  });
};

exports.index = function(req, res){
  Trip.all(function(err, trips){
    res.render('trips/index', {trips: trips, moment: moment});
  });
};

exports.stops = function(req, res){
  Trip.findById(req.params.id, function(trip){
    Stop.find(req.params.id, function(stops){
      res.render('trips/stops', {trip: trip, stops: stops});
    });


  });
};


