(function() {
    'use strict';
    var connectionReference,
        createConnection,
        getConnection,
        q = require('q');

    createConnection = function createConnection() {
        var MongoClient,
            Server,
            defer = q.defer();
        if(!connectionReference) {
            MongoClient = require('mongodb').MongoClient;
            Server = require('mongodb').Server;

            MongoClient.connect('mongodb://localhost:27017/command_db', function(err, db) {
                if(err) {
                    defer.reject();
                    return defer.promise;
                }
                connectionReference = db;
                db.createCollection('categories', function(err, collection) {
                    if(err) {
                        defer.reject();
                        return defer.promise;
                    }
                    defer.resolve();
                });
            });
        }
        return defer.promise;
    };

    getConnection = function getConnection() {
        var defer = q.defer();
        if(!connectionReference) {
            createConnection().then(function() {
                defer.resolve(connectionReference);
            })
            .catch(function() {
                defer.reject();
            })
            .done();
        } else {
            defer.resolve(connectionReference);
        }
        return defer.promise;
    }

    module.exports = {
        createConnection: createConnection,
        getConnection: getConnection
    }
}());
