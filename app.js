
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
    gruntfile = require('./Gruntfile'),
    grunt = require('grunt'),
    applicationRoutes = require('./routes/application_routes');

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3030);
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

    gruntfile(grunt);

    db.createConnection()
        .then(function() {
        console.log('Successfully Connected to Database');
    })
    .catch(function() {
        console.error('Error Connecting to Database');
    })
    .done();
});
