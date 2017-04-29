
var express = require("express");

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require( "morgan" );
var sessionOptions = {
  secret: '1234567890QWERTY',
  resave: true,
  saveUninitialized: true,
  proxy: true,
  store: new RedisStore()
};

//test


// configure express

var app     = express();
//app.use( logger( "dev" ) );
app.use( express.query() );
app.use( bodyParser.urlencoded({extended:true}) );
app.use( bodyParser.json() );
app.use( cookieParser(sessionOptions.secret) );



//var io = require('socket.io')(http);

app.use(session(sessionOptions));



app.use(express.static(__dirname + '/public'));

module.exports = app;
