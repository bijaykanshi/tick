var express = require('express'),
	bodyParser = require('body-parser'),
 	methodOverride = require('method-override');

module.exports = function(app, io) {
	app.set('view engine', 'html');
	app.engine('html', require('ejs').renderFile);
	app.set('views', __dirname + '/client');
	app.use(bodyParser.urlencoded({ extended: false}));
	app.use(bodyParser.json({limit: '10mb'}));
	app.use(methodOverride('X-HTTP-Method'));          // Microsoft
	app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
	app.use(methodOverride('X-Method-Override')); 
	app.use(express.static(__dirname + '/client'));

};
