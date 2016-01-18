var express = require('express'),
	app = express();
var port = process.env.PORT || 8084;
var io = require('socket.io').listen(app.listen(port));
var dbconnection = require('./route/dbConnection.js');
var mongodb = require('./route/coach/mongodb')
var router = express.Router();
var fs = require('fs');
var path = require('path');
var jsonfile = require('jsonfile')
var util = require('util')
require('./config')(app);
require('./route/routes')(app, dbconnection);
var coachRoute = require('./route/coach/coachRoute')(router, fs, path, jsonfile, dbconnection, mongodb);
app.use('/coach', coachRoute);
require('./chat')(io, dbconnection);
console.log('Your application is running on http://localhost:' + port);