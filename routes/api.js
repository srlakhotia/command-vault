/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
    res.json({
        myName: 'create new Angular site'
    });
};