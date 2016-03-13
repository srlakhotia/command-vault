var db = require('../db'),
    mongo = require('mongodb'),
    getCategoryById,
    getAllCategories,
    saveCategory,
    connection = db.getConnection();

getCategoryById = function getCategoryById (req, res) {
    var id = req.params.id ? new mongo.ObjectID(req.params.id) : null;
    connection.then(function(connection) {
        var collection = connection.collection('categories').findOne({"_id":id}, function(err, data) {
            res.send(data);
        });
    });
};

getAllCategories = function getAllCategories (req, res) {
    var categoryCollection = [];
    connection.then(function(connection) {
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

saveCategory = function saveCategory(req, res) {
    var insertionObject = {
        'name': req.body.name,
        'description': req.body.description,
        'commandsArray': req.body.commandsArray || []
    };
    connection.then(function(connection) {
        connection.collection('categories').insert(insertionObject, function(err, docsInserted) {
            insertionObject['_id'] = docsInserted.insertedIds[0].toString();
            res.send(insertionObject);
        });
    });
};

module.exports = {
    getCategoryById: getCategoryById,
    getAllCategories: getAllCategories,
    saveCategory: saveCategory
}