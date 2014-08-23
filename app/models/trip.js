'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash'),
    fs    = require('fs'),
    path  = require('path');

function Trip(o){
  //ID given here so that we can save a photo without two calls to the database
  this._id          = Mongo.ObjectID;
  this.name         = o.name[0];
  this.cash         = o.cash[0] * 1;
  this.origin       = {name: o.originName[0], lat: parseFloat(o.originLat[0]), lng: parseFloat(o.originLng[0]) };
  this.destination  = {name: o.destName[0], lat: parseFloat(o.destLat[0]), lng: parseFloat(o.destLng[0]) };
  this.mpg          = o.mpg[0] * 1;
  this.begin        = new Date(o.begin[0]);
  this.end          = new Date(o.end[0]);
  this.photo        = [];
  this.distance     = o.distance[0] * 1;
 
  //Trip Calculations
  this.gasPerGallon = o.gasPerGallon[0] * 1;
  this.gallons      = Math.ceil(this.distance / this.mpg);
  this.tripCost     = this.gasPerGallon * this.gallons;
  this.delta        = this.cash - this.tripCost;

  this.stops        = [];
  this.events       = [];
  this.photos       = [];
}

Object.defineProperty(Trip, 'collection', {
  get: function(){return global.mongodb.collection('people');}
});

Trip.all = function(cb){
  Trip.collection.find().toArray(cb);
};

module.exports = Trip;

