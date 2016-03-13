var commandApp = angular.module('commandApp', ['ngRoute', 'ngSanitize']);

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
            })
            .when('/commands', {
                templateUrl: '/partials/commands',
                controller: 'CommandsController'
            })
            .when('/categories', {
                templateUrl: '/partials/categories',
                controller: 'CategoriesController',
                reloadOnSearch: false
            });
    });

}(angular));