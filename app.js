/*var express = require('express'),
	app = express();
var port = process.env.PORT || 8084;
var io = require('socket.io').listen(app.listen(port));
var dbconnection = require('./route/dbConnection.js');
var mongodb = require('./route/coach/mongodb')
var router = express.Router();
var fs = require('fs');
var path = require('path');
var jsonfile = require('jsonfile');
var util = require('util');*/
/*var ref = {
	express: require('express'),
	app: ref.express(),
	port: process.env.PORT || 8084,
	io: require('socket.io').listen(ref.app.listen(ref.port)),
	dbconnection: require('./route/dbConnection.js'),
	mongodb: require('./route/coach/mongodb'),
	router: ref.express.Router(),
	fs: require('fs'),
	path: require('path'),
	jsonfile: require('jsonfile'),
	util: require('util')
}*/
var ref = new function() {
    this.express =  require('express');
	this.app = this.express();
	this.port = process.env.PORT || 8084;
	this.io = require('socket.io').listen(this.app.listen(this.port));
	this.dbconnection =  require('./route/dbConnection.js');
	this.mongodb = require('./route/coach/mongodb');
	this.router = this.express.Router();
	this.fs = require('fs');
	this.path = require('path');
	this.jsonfile = require('jsonfile');
	this.util = require('util');
	this.url = require('url');
}
require('./config')(ref.app);
require('./route/routes')(ref);
ref.coachRoute = require('./route/coach/coachRoute')(ref);
ref.app.use('/coach', ref.coachRoute);
require('./chat')(ref.io, ref.dbconnection);
console.log('Your application is running on http://localhost:' + ref.port);