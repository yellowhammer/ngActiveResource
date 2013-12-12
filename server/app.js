var express    = require('express');
var app        = module.exports = express();
var db         = require('./lib/mongooseModels');
var facultyAPI = require('faculty-api');
var path       = require('path');

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, '../bower_components/')));
  app.use(express.static(path.join(__dirname, '../lib/')));
  app.use(express.static(path.join(__dirname, '../example')));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.use(app.router);
});

facultyAPI.addResource({
  app: app,
  resourceName: 'systems',
  collection: db.system
});

facultyAPI.addResource({
  app: app,
  resourceName: 'sensors',
  collection: db.sensor
});

app.set('port', process.env.PORT || 3000);
