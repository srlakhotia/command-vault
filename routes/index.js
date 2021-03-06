'use strict';
var utils = require('../utils');
/*
 * Routing
 */

exports.index = function(req, res){
    res.render('index', {
        appJs: utils.getAppJs(),
        appLess: utils.getAppLess(),
    });
};

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};