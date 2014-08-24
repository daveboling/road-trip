'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash'),
    fs    = require('fs'),
    path  = require('path'),
    Stop  = require('./stop');

function Stop(o){
  this._id     = Mongo.ObjectID();
  this._tripID = o._tripID;
  this.name    = o.name;
  this.lat     = o.lat * 1;
  this.lng     = o.lng * 1;
  this.events  = [];
  this.photos  = [];
}

Object.defineProperty(Stop, 'collection', {
  get: function(){return global.mongodb.collection('stops');}
});

Stop.find = function(query, cb){
  Stop.collection.find({_tripID: query}).toArray(function(err, stops){
    cb(stops);
  });
};

module.exports = Stop;