
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

var nowjs = require('now');

var everyone = nowjs.initialize(app);
everyone.now.logStuff = function(msg){
  console.log(msg);
}

var pg = require('pg')
var conString = 'tcp://postgres:1234@localhost/postgres'

var query = function(query, callback){
  pg.connect(conString, function(err, client){
    cient.query(query, callback)
  })
}
everyone.now.query = query;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Foo'
  });
});

app.get('/foo', function(req, res){
  res.render('foo', {
    title: 'Foo'
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
