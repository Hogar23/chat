var express = require("express");

var app     = express();

var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var test = require('blue-tape');
var http = require('http').Server(app);
var httpp = require('http');
var logger = require( "morgan" );



var RedisStore = require('connect-redis')(session);

/*
var redisSrv = require('./redis-srv');

var _timeSecDay = 60 * 60 * 24

// Takes a store through all the operations
function lifecycleTest (store, t) {
  P.promisifyAll(store);

  return redisSrv.connect()
    .then(function () {
      return store.setAsync('123', { cookie: { maxAge: 2000 }, name: 'tj' });
    })
    .then(function (ok) {
      t.equal(ok, 'OK', '#set() ok');
      return store.getAsync('123');
    })
    .then(function (data) {
      t.deepEqual({ cookie: { maxAge: 2000 }, name: 'tj' }, data, '#get() ok');
    })
    .then(function () {
      return store.setAsync('123', { cookie: { maxAge: undefined }, name: 'tj' });
    })
    .then(function (ok) {
      t.equal(ok, 'OK', '#set() no maxAge ok');
      return store.destroyAsync('123');
    })
    .then(function (ok) {
      t.equal(ok, 1, '#destroy() ok');
      store.client.end();
      return redisSrv.disconnect()
    });
}

test('defaults', function (t) {
  var store = new RedisStore();
  t.equal(store.prefix, 'sess:', 'defaults to sess:');
  t.notOk(store.ttl, 'ttl not set');
  t.notOk(store.disableTTL, 'disableTTL not set');
  t.ok(store.client, 'creates client');

  store.client.end();
  t.end();
});
*/


// configute express 

app
    .use( logger( "dev" ) )
    .use( express.query() )
    .use( bodyParser() )
    .use( cookieParser() )
    


//var io = require('socket.io')(http);

app.use(session({
  store: new RedisStore({
    host: 'localhost'
  }),
  secret: '1234567890QWERTY'

}));





var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'root', '');






var Users = sequelize.define('users', {
    id_user: {type: Sequelize.INTEGER, unique: true, primaryKey: true},
    username:Sequelize.STRING ,
    pass:Sequelize.STRING
}, 
    {
      freezeTableName: true // Model tableName will be the same as the model name
    })


Users.sync({force: false});

//sequelize.sync()

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){


  res.sendfile('index.html');


});


var FindUser = function (req, res) {
  
  

  Users.findOne({where: {username: req.query.username, pass:req.query.password}}).then(function (properties) {    
    res.json(properties);
     
    
    if(properties.length==0){

    }else{
      var hour = 3600000
      req.session.cookie.expires = new Date(Date.now() + hour)
      req.session.cookie.maxAge = hour

          var obj = JSON.stringify(properties);
          var jsonn = JSON.parse(obj);
          console.log();
          var user_id = jsonn.id_user 

          req.session.id = user_id;
          req.session.name = jsonn.username;

          console.log( JSON.stringify( req.session ) );
  
   /*       
          var hour = 3600000
          req.session.cookie.expires = new Date(Date.now() + hour)
          req.session.cookie.maxAge = hour
          req.session.username=jsonn.username;
                
          
          console.log( "user " + user_id + " has logged in" );
          console.log( JSON.stringify( req.session ) );*/
       

   /* if( req.session.id == void( 0 ) ){
        res.end( "user not logged in" );
    } else {
        res.end( "user " + req.session._meta.id + " is logged in" );
    }*/

    

  }

});






}
var home = function (req, res) {
 

 console.log( JSON.stringify( req.session ) );

}


app.get('/login', FindUser);
app.get('/home', home);

app.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }
    else
    {
      res.redirect('/');
    }
  });
});



http.listen(3000, function(){
  console.log('listening on *:3000');


});