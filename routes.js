var app = require('./app');
var db = require('./db');

app.get('/', function(req, res){


  res.sendfile('index.html');


});


app.get('/home', function (req, res) {

 console.log( req.session );
 res.json(req.session);

});


app.get('/login', function (req, res) {

  db.models.Users.find({where: {username: req.query.username, pass:req.query.password}})
  .then(function (user) {


    if(!user){
      return;
    }
    var hour = 3600000
    req.session.cookie.expires = new Date(Date.now() + hour)
    req.session.cookie.maxAge = hour

    var user_id = user.id_user
    req.session.user = {};
    req.session.user.id = user_id;
    req.session.user.name = user.username;

    console.log(req.session);

    res.json(user);
  });

});


app.get('/logout', function(req, res){
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
