'use strict';

var mp     = require('multiparty'),
    moment = require('moment'),
    Stop   = require('../models/stop');
    

exports.createStop = function(req, res){

  console.log('---GEOCODED STOPS---');
  console.log(req.body);
  console.log('---GEOCODES STOPS END---');

  Stop.insert(req.body.stop, req.body.tripID, function(){
    res.redirect('/trips/' + req.params.id );
  });
};

exports.events = function(req, res){

};

exports.createEvent = function(req, res){

};