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
  Stop.collection.findOne({_id: id}, function(err, obj){
    var stop = _.create(Stop.prototype, obj);
    cb(stop);
  }); 
};

Stop.prototype.eventsAndPhotos = function(files, fields, cb){
  //ADD PHOTOS TO FILE SYSTEM AND PHOTOS ARRAY
  var baseDir = __dirname + '/../static',
      relDir  = '/img/' + this._id,
      absDir  = baseDir + relDir,
      exists = fs.existsSync(absDir),
      self = this;

  if(!exists){
    fs.mkdirSync(absDir);
  }

  //Stops mkdirSync from trying to create a dir if there isn't a photo to upload
  files.photos.forEach(function(photo){
    var ext = path.extname(photo.path),
        fileName = self.photos.length + ext,
        rel = relDir + '/' + fileName,
        abs = absDir + '/' + fileName;
    fs.renameSync(photo.path, abs);

    self.photos.push(rel);

  });

  //this.photos = _.compact(this.photos);


  //Push events to events array
  fields.events.forEach(function(e){
    //Don't let blank values through
    if(!e) { return; }
    self.events.push(e);
  });

  //SAVE AFTER IT'S ALL DONE
  Stop.collection.save(this, cb);

};

module.exports = Stop;