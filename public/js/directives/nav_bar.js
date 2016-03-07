commandApp
    .directive('navBar', function() {
        'use strict';

        var navBarController = function($scope, $location) {
            $scope.menuItems = [
                // 'Categories',
                'Settings'
            ];

            $scope.navigateToMenu = function navigateToMenu(menu) {
                switch(menu) {
                    case 'Settings':
                        $location.url('/settings')
                }
            }
        };

        return {
            restrict: 'E',
            templateUrl: '/partials/nav_bar',
            link: function(scope) {},
            controller: ['$scope', '$location', navBarController]
        }
    });