


   var Logins = Backbone.Collection.extend({
       url: '/login'   
    });


    var Login = Backbone.Model.extend({
        urlRoot: '/login'
    });

     var Homes = Backbone.Collection.extend({
        url: '/home'
    });
      var Home = Backbone.Model.extend({
        model: Homes,
        url: '/home'
    });




var Loginn = Backbone.View.extend({
   el: '.mainTmp',
   events: {'click .login':"load"},
   load: function(){
var that = this;
           var usr = $('#inputUsername').val();
           var pass = $('#inputPassword').val();
           var note = "";

           var log = new Login();
           log.fetch({

            data: {
              username: usr,
              password:pass
            },
            success: function (data) {

              


              
              if ( JSON.stringify(data).length == 2 ) {

          
                    $(".redP").html("Password or Username is not valid")
                  
              }else{

                window.location.href ="http://localhost:3000/#/home";
                
              }
             },
             error: function(){
              console.log('Neispravna')
             }
           })
        },
      render: function () {
            var template = _.template($('#login-template').html());
            this.$el.html(template({ value: "" }));
            

          }

});


var HomeView = Backbone.View.extend({
  el:'.mainTmp',
  render: function () {
    var that = this;
    var hh = new Home();

    hh.fetch({   
       
            success: function (data) {
              console.log(data);
                var template = _.template($('#home-template').html());
                that.$el.html(template);
            },
             error: function(){
              console.log('Neispravna')
             }
            })
           
            

  }
})


var Router = Backbone.Router.extend({
    routes : {
      '':'login',
      'home':'home'
    }
  });

  var router = new Router();
  var loginn = new Loginn();
  var homee = new HomeView();

  router.on('route:login', function(){
    loginn.render();
  }); 

  router.on('route:home', function(){
    homee.render();
  });


  Backbone.history.start();