var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var compression = require('compression');

// view engine setup
module.exports = function (app, config) {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(compression());
    app.use(express.static(path.join(config.rootPath, 'public')));
}