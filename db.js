(function() {
    'use strict';
    var mongoose = require('mongoose'),
        db,
        Schema;

    // mongoose.connect('mongodb://localhost/command_db');
    // db = mongoose.connection;
    var MongoClient = require('mongodb').MongoClient,
        Server = require('mongodb').Server;

    // var mongoClient = new MongoClient(new Server('localhost', 27017));

    MongoClient.connect('mongodb://localhost:27017/testDb', function(err, db) {
        db.createCollection('test', function(err, collection) {});
    });
    // mongoClient.open(function(err, mongoClient) {
    //     var db1 = mongoClient.db('command_db')
    // });

    /*db.once('open', function(cb) {
        var sc = mongoose.Schema({
            test: String
        });

        var mod = mongoose.model('test_schema', sc);
    });*/
}());