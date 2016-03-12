commandApp
    .directive('navBar', function() {
        'use strict';

        var navBarController = function($scope, $location) {
            $scope.menuItems = [
                {
                    name: 'Dashboard',
                    route: '/dashboard'
                }, {
                    name: 'Commands',
                    route: '/commands'
                }, {
                    name: 'Categories',
                    route: '/categories?v=allCategories'
                }, {
                    name: 'Settings',
                    route: '/settings'
                }
            ];

            $scope.navigateToMenu = function navigateToMenu(route) {
                $location.url(route);
            }
        };

        return {
            restrict: 'E',
            templateUrl: '/partials/nav_bar',
            link: function(scope) {},
            controller: ['$scope', '$location', navBarController]
        }
    });