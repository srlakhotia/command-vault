'use strict';

var q = require('q'),
    path = require('path'),
    fs = require('fs');

module.exports = {
    getAppJs: function() {
        var allJs = [],
            appsRoot = __dirname,
            addFiles;

        addFiles = function(rootDir, dir) {
            var fullDir = path.join(rootDir, 'public', 'js', dir);
            if (!fs.existsSync(fullDir)) {
                console.warn('Tried to load JS from a directory that does not exist: ' + fullDir)
                return;
            }

            fs.readdirSync(fullDir).forEach(function(file) {
                var fileInfo = fs.lstatSync(fullDir + '/' + file);
                if(fileInfo.isDirectory()) {
                    addFiles(rootDir, dir + '/' + file);
                }

                if (file.indexOf('.js') != file.length - 3)
                    return;

                allJs.push('public/js/' + dir + '/' + file);
            });
        };

        //first load lib files
        addFiles(appsRoot, 'lib');

        //Inject top angular module
        allJs.push('public/js/appModule.js');

        addFiles(appsRoot, 'filters');
        addFiles(appsRoot, 'directives');
        addFiles(appsRoot, 'controllers');
        addFiles(appsRoot, 'services');
        return allJs;
    }
}