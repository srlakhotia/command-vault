
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
    q = require('q'),
    grunt = require('grunt'),
    gruntfile = require('./Gruntfile')
    applicationRoutes = require('./routes/application_routes');
    applicationFileLoader = require('./load_dependencies');

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
    var basePath = __dirname + '/public/js',
        fileList = [],
        haveSubDirs = false,
        getFilesFromDir = function getFilesFromDir(dir, type) {
            fs.readdir(dir, function(err, list) {
                if(err) {return;}

                haveSubDirs = list.some(function(fileOrDir) {
                    return (fileOrDir.indexOf('.') === -1);
                });

                list.forEach(function(fileOrDir) {
                    if(fileOrDir.indexOf('.') === -1) {
                        getFilesFromDir(dir + '/' + fileOrDir, type);
                    } else {
                        if(fileOrDir.substring(fileOrDir.lastIndexOf('.'), fileOrDir.length) === type) {
                            fileList.push(dir + '/' + fileOrDir);
                        }
                    }
                });

                if(!haveSubDirs) {
                    applicationFileLoader.loadAllDependencies(fileList, type);
                }
            });
        };

    console.log('Express server listening on port ' + app.get('port'));
    applicationRoutes.initiateFrameworRoutes(app);
    // gruntfile(grunt);
    /**
     * Initiating routes
     */

    getFilesFromDir(basePath, '.js');

    db.createConnection()
        .then(function() {
        console.log('Successfully Connected to Mongo');
    })
    .catch(function() {
        console.error('Error Connecting to Mongo');
    })
    .done();
});
