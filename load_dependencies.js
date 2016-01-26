var loadAllDependencies;
(function() {
    'use strict';

    loadAllDependencies = function loadAllDependencies(fileList, type) {
        if(fileList && fileList.length) {
            fileList.forEach(function(file) {
                var element;
                if(type === '.js') {
                    // element = document.createElement('script');
                    // element.src = file;
                    // element.type = 'text/javascript';
                    // document.body.appendChild(element);
                }
            });
        }
    };
}());

module.exports = {
    loadAllDependencies: loadAllDependencies
}