"use strict";

var express = require('express');
require('./v2/model/mongoSchema')
require('../app/config/mongoose');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
var app = express();
var config = require('./config/config')[env];

require('./config/express')(app, config);
require('./config/api')(app);
require('./config/routes')(app);


// Starting the server
var port = config.port || 1203;
var server = app.listen(port);
console.log("Server Started at port :"+ port);





