var db = require('../db'),
    mongo = require('mongodb');

exports.getCategoryById = function getCategoryById (req, res) {
    var id = req.params.id ? new mongo.ObjectID(req.params.id) : null;
    db.getConnection().then(function(connection) {
        var collection = connection.collection('categories').findOne({"_id":id}, function(err, data) {
            res.send(data);
        });
    });
};

exports.getAllCategories = function getAllCategories (req, res) {
    var categoryCollection = [];
    db.getConnection().then(function(connection) {
        var cursor = connection.collection('categories').find();
        cursor.each(function(err, item) {
            if(item == null) {
                res.send(categoryCollection);
            } else {
                categoryCollection.push(item);
            }
        });
    });
};