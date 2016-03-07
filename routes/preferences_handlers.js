var db = require('../db'),
    mongo = require('mongodb'),
    getPreferences;

getPreferences = function getPreferences (req, res) {
    var categoryCollection = [];
    db.getConnection().then(function(connection) {
        var cursor = connection.collection('settings').find();
        cursor.each(function(err, item) {
            if(item == null) {
                res.send(categoryCollection);
            } else {
                categoryCollection.push(item);
            }
        });
    });
};

savePreferences = function savePreferences(req, res) {
    console.log('req.payload::: ', req)
    db.getConnection().then(function(connection) {
        var cursor = connection.collection('settings').find();
        cursor.each(function(err, item) {
            console.log('err::: ', err)
            console.log('item::: ', item)
        })
        res.send({});
    });
};

module.exports = {
    getPreferences: getPreferences,
    savePreferences: savePreferences
}