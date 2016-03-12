var db = require('../db'),
    mongo = require('mongodb'),
    objectId = mongo.ObjectId,
    getPreferences;

getPreferences = function getPreferences (req, res) {
    var categoryCollection = [];
    db.getConnection().then(function(connection) {
        var cursor = connection.collection('settings').find();
        cursor.each(function(err, item) {
            if(item == null) {
                res.send(categoryCollection[0]);
            } else {
                categoryCollection.push(item);
            }
        });
    });
};

savePreferences = function savePreferences(req, res) {
    var updationObject,
        isFirstSave = false,
        settingsCollection;

    updationObject = {
        defaultView: req.body.defaultView
    };

    if(!req.body._id) {
        isFirstSave = true;
    }

    db.getConnection().then(function(connection) {
        settingsCollection = connection.collection('settings');
        if(!isFirstSave) {
            // settingsCollection.update({
            //     query: {"_id":objectId(req.body._id)},
            //     update: {$set: updationObject},
            //     upsert: true
            // }, function(err, docsUpdated) {
            //     res.send(updationObject);
            // });

            settingsCollection.update({"_id":objectId(req.body._id)}, updationObject, {upsert: true}, function(err, docsUpdated) {
                res.send(updationObject)
            });
        } else {
            var cursor = settingsCollection.insert(updationObject, function(err, docsInserted) {
                updationObject['_id'] = docsInserted.insertedIds[0].toString();
                res.send(updationObject);
            });
        }
    });
};

module.exports = {
    getPreferences: getPreferences,
    savePreferences: savePreferences
}