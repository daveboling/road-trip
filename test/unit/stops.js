/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Stop      = require('../../app/models/stop'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'roadtrip';

describe('Stop', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Stop object', function(){
      var stop = new Stop({
        _tripID: '000000000000000000000001', 
        lat: '36.116', 
        lng: '-110.116', 
        name: 'Knoxville, TN, USA'
      });

      expect(stop).to.be.instanceof(Stop);
      expect(stop.lat).to.equal(36.116);
      expect(stop.lng).to.equal(-110.116);
      expect(stop.name).to.equal('Knoxville, TN, USA');
      expect(stop.photos).to.have.length(0);
      expect(stop.events).to.have.length(0);

    });
  });

  describe('.find', function(){
    it('should find stops based on a _tripID', function(done){
      Stop.find('000000000000000000000001', function(stops){
        expect(stops).to.have.length(1);
        done();
      });
    });
  });

  describe('findById', function(){
    it('should find a stop based on its _id', function(done){
      Stop.findById('100000000000000000000000', function(stop){
        expect(stop.name).to.equal('Knoxville, TN, USA');
        done();
      });
    });
  });


});