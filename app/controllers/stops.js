'use strict';

var mp     = require('multiparty'),
    Stop   = require('../models/stop'),
    Mongo  = require('mongodb'),
    Trip   = require('../models/trip');
    

exports.createStop = function(req, res){
  var names = (req.body.name.length === 1) ? req.body.name : [req.body.name]; 
  Stop.insert(req.body.stop, req.body.tripID, function(){
    Trip.collection.update({_id: Mongo.ObjectID(req.params.id)}, {$push : {stops: {$each : names}}}, function(){
      res.redirect('/trips/' + req.params.id );
    });
  });
};

exports.events = function(req, res){

};

exports.createEvent = function(req, res){

};