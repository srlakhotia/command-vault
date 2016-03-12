commandApp
    .directive('subnav', function() {
        'use strict';

        var subnavController = function subnavController($scope) {
            $scope.switchSubnav = function switchSubnav(link) {
                $scope.callback({link: link});
            }
        };

        return {
            restrict: 'E',
            templateUrl: '/partials/subnav',
            link: function() {},
            scope: {
                navItems: '=',
                callback: '&'
            },
            controller: ['$scope', subnavController]
        };
    });