var app = require('./app');

var http = require('http').Server(app);
var httpp = require('http');


var routes = require('./routes');
var db = require('./db');


db.sequelize.sync()
.then(function () {
  http.listen(3000, function(){
    console.log('listening on *:3000');
  });
});
