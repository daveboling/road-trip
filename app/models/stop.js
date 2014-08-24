'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash'),
    fs    = require('fs'),
    path  = require('path');

function Stop(o){
  this._id     = Mongo.ObjectID();
  this._tripID = o.tripID;
  this.name    = o.name;
  this.lat     = o.lat * 1;
  this.lng     = o.lng * 1;
  this.events  = [];
  this.photos  = [];
}

Object.defineProperty(Stop, 'collection', {
  get: function(){return global.mongodb.collection('stops');}
});

//insert will do bulk inserts or just one if needed
Stop.insert = function(stops, tripID, cb){
  var s;

  //if stops has a length, it needs to be mapped
  if(stops.length){
    s = stops.map(function(s){
      s.tripID = Mongo.ObjectID(tripID);
      return new Stop(s);
    });
  }else {
    s = new Stop(stops);
    s.tripID = Mongo.ObjectID(tripID);
  }

  Stop.collection.insert(s, cb);
};

Stop.find = function(query, cb){
  var id = Mongo.ObjectID(query);
  Stop.collection.find({_tripID: id}).toArray(function(err, stops){
    cb(stops);
  });
};

Stop.findById = function(query, cb){
  var id = Mongo.ObjectID(query);
  Stop.collection.findOne({_id: id}, function(err, stop){
    cb(stop);
  }); 
};


Stop.prototype.addPhotos = function(files){
  var baseDir = __dirname + '/../static',
      relDir  = '/img/' + this._id,
      absDir  = baseDir + relDir;

  fs.mkdirSync(absDir);

  this.photos = files.photos.map(function(photo, index){
    if(!photo.size){return;}

    var ext      = path.extname(photo.path),
        name     = index + ext,
        absPath  = absDir + '/' + name,
        relPath  = relDir + '/' + name;

    fs.renameSync(photo.path, absPath);
    return relPath;
  });

  this.photos = _.compact(this.photos);
};

module.exports = Stop;