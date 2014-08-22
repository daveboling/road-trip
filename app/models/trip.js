'use strict';

function Trip(){
}

Object.defineProperty(Trip, 'collection', {
  get: function(){return global.mongodb.collection('people');}
});

Trip.all = function(cb){
  Trip.collection.find().toArray(cb);
};

module.exports = Trip;

