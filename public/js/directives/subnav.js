commandApp
    .directive('subnav', function() {
        'use strict';

        var subnavController = function subnavController($scope, $routeParams) {
            $scope.routeParams = $routeParams;

            $scope.switchSubnav = function switchSubnav(link) {
                if($scope.routeParams.v === link) {
                    return;
                }

                $scope.callback({link: link});
            };
        };

        return {
            restrict: 'E',
            templateUrl: '/partials/subnav',
            link: function() {},
            scope: {
                navItems: '=',
                callback: '&'
            },
            controller: ['$scope', '$routeParams', subnavController]
        };
    });