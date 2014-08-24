'use strict';

var mp     = require('multiparty'),
    Trip   = require('../models/trip'),
    moment = require('moment');

exports.new = function(req, res){
  res.render('trips/new');
};

exports.create = function(req, res){
  var form = new mp.Form();

  form.parse(req, function(err, fields, files){

    console.log('----FIELDS----');
    console.log(fields);
    console.log('----FIELDS END----');

    console.log('----FILES----');
    console.log(files);
    console.log('----FILES END----');

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

    console.log('---FOUND STOP---');
    console.log(trip);
    console.log('---FOUND STOP END---');

    res.render('trips/stops', {trip: trip});
  });
};

exports.createStop = function(req, res){

};

exports.events = function(req, res){

};

exports.createEvent = function(req, res){

};
