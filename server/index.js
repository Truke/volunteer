'use strict'

var path = require('path');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

var app = express();
var port = 3031;

var publicDir = path.dirname(require.main.filename) + '/app/dist';

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: 'just-relax',
	resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}))

app.use(express.static(publicDir));


var db = mongoose.connect('mongodb://localhost:27017/volunteer');

var modelsPath = path.join(__dirname, 'db');

fs.readdirSync(modelsPath).forEach(function (file) {
	if (/(.*)\.(js$|coffee$)/.test(file)) {
		require(modelsPath + '/' + file);
	}
});


// 跨域设置
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	res.header('X-Powered-By', '3.2.1');
	res.header('Content-Type', 'text/json;charset=utf-8');
	next();
})

require('./routes')(app);

app.get('*', function(req,res) {
	res.sendFile(path.join(publicDir, '/index.html'));
})

module.exports = app;



