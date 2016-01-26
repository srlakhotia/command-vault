
/**
 * Module dependencies
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    env,
    db = require('./db'),
    applicationRoutes = require('./routes/application_routes');
    // applicationFileLoader = require('./auto_loader');

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3030);
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '')));
app.use(bodyParser.urlencoded({ extended: false }));

env = process.env.NODE_ENV || 'local';

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));

    /**
     * Initiating routes
     */
    applicationRoutes.initiateFrameworRoutes(app);
    // applicationFileLoader.loadAllDependencies();
    db.createConnection()
        .then(function() {
        console.log('Successfully Connected to Mongo');
    })
    .catch(function() {
        console.error('Error Connecting to Mongo');
    })
    .done();
});
