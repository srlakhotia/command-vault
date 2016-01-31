(function() {
    'use strict';
    var basePath = './public/js/',
        jsFiles = [
            /**** Loading angular****/
            'lib/angular/angular.js',
            'lib/angular/angular-route.js',

            /**** Loading jQuery on angular ****/           
            'lib/jquery-2.2.0.min.js',


            /**** Loading main app for routes on angular ****/
            'appModule.js',


            /**** Loading services ****/
            /**** Loading controllers ****/
            /**** Loading filters ****/
        ],
        getScript;

    getScript = function getScript(url,success){
        var body = document.getElementsByTagName("body")[0],
            done = false,
            script = document.createElement("script");

        script.src = url;
        script.type = 'text/javascript';
        script.defer = 'defer';
        script.async = 'async';
        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState ||
                this.readyState == "loaded" || this.readyState == "complete") ) {
                done = true;
                if(success && typeof success === 'function') {
                    success();
                }
            }
        };
        // script.load();
        body.appendChild(script);
    };

    jsFiles.forEach(function(jsFile) {
        getScript(basePath + jsFile,function(){});
    });
}());