var express = require("express");

var app     = express();

var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var http = require('http').Server(app);
var httpp = require('http');
var MongoStore = require('connect-mongo')(session);

/*app.use(session({secret: 'yourothersecretcode', saveUninitialized: true, resave: true,key:'idd'}));
*/ 
/*app.use(session({
  secret: 'appsecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: new Date(Date.now() + 3600000)
  }}))*/


app.use(cookieParser());

app.use(session({
  store: new MongoStore({
    db: 'sesije'
  }),
  secret: '1234567890QWERTY',
  cookie:{maxAge:6000}
}));
var sess;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//var io = require('socket.io')(http);







var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'root', '');






var Users = sequelize.define('users', {
  id_user: {type: Sequelize.INTEGER, unique: true, primaryKey: true},
  username:Sequelize.STRING ,
  pass:Sequelize.STRING,
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
  sess = req.session;
  

  Users.findAll({where: {username: req.query.username, pass:req.query.password},limit:1}).then(function (properties) {    
  res.json(properties);
  
    
    if(properties.length==0){

    }else{

      
//In this we are assigning email to sess.email variable.
//email comes from HTML page.
    sess.name=req.query.username;

      if (!sess.name) {
            console.log("Greska nema sesije")// handle error
          }


    
    console.log(sess.name)
    res.end('done');
      
    }

    

  });






}
var home = function (req, res) {
   sess = req.session; 

    console.log(sess.name)

    if(req.session.name=="undefined"){
     
    
      res.status(404).end();
    }

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