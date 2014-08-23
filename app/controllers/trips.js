'use strict';

var mp = require('multiparty');

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

    res.redirect('/trips');

  });
};

exports.index = function(req, res){

};

exports.stops = function(req, res){

};

exports.createStop = function(req, res){

};

exports.events = function(req, res){

};

exports.createEvent = function(req, res){

};
