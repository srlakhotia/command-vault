var commandApp = angular.module('commandApp', ['ngRoute']);

(function(angular) {
    commandApp.config(function($routeProvider){
        $routeProvider
            .when('/', {
                redirectTo: '/dashboard'
            })
            .when('/dashboard', {
                templateUrl: '/partials/dashboard',
                controller: 'DashboardController'
            })
            .when('/settings', {
                templateUrl: '/partials/settings',
                controller: 'SettingsController'
            });
    });

}(angular));