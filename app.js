
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  fs = require('fs'),
  bodyParser = require('body-parser'),
  env,
  db = require('./db');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3030);
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

env = process.env.NODE_ENV || 'local';



/**
 * Routes
 */

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/api/getCategoryById/:id', api.getCategoryById);
app.get('/api/getAllCategories', api.getAllCategories);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
  db.createConnection()
    .then(function() {
      console.log('Successfully Connected to Mongo');
    })
    .catch(function() {
      console.error('Error Connecting to Mongo');
    })
    .done();
});
