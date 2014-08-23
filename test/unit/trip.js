/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Trip    = require('../../app/models/trip'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'trips';

describe('Trip', function(){
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
    it('should create a new Trip object', function(){
      var trip = new Trip({
        name: ['Las Vegas 2013'],
        cash: ['1000'],
        mpg: ['35'],
        begin: ['2014-10-05'],
        end: ['2014-12-05'],
        originLat: ['36.16'],
        originLng: ['-86.8'],
        originName: ['Nashville, TN, USA'],
        destLat: ['36.17'],
        destLng: ['-115.14'],
        destName: ['Las Vegas, TN, USA']
      });


      //Change destination and origi into objects
      //that have a lat, lng and locationName
      expect(trip).to.be.instanceof(Trip);
      expect(trip.name).to.equal('Las Vegas 2013');
      expect(trip.cash).to.equal(1000);
      expect(trip.mpg).to.equal(35);
      expect(trip.begin).to.be.instanceof(Date);
      expect(trip.end).to.be.instanceof(Date);
      expect(trip.photo).to.have.length(0);
      expect(trip.origin.lat).to.equal(36.16);
      expect(trip.origin.lng).to.equal(-86.8);
      expect(trip.origin.name).to.equal('Nashville, TN, USA');
      expect(trip.destination.lat).to.equal(36.17);
      expect(trip.destination.lng).to.equal(-115.14);
      expect(trip.destination.name).to.equal('Las Vegas, TN, USA');
    });
  });

  describe('.all', function(){
    it('should get all people', function(done){
      Trip.all(function(err, people){
        expect(people).to.have.length(2);
        done();
      });
    });
  });


});

