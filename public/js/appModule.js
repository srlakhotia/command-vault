(function(angular) {
    var commandApp = angular.module('commandApp', ['ngRoute']);

    commandApp.config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: '/partials/one',
                controller: function(){}
            });
    });

}(angular));