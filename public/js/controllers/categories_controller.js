commandApp
    .controller('CategoriesController', [
        '$scope',
        '$routeParams',
        '$location',
        function($scope, $routeParams, $location){
            var linkArray = ['allCategories', 'addCategory'];

            if(!$routeParams.v || linkArray.indexOf($routeParams.v) === -1) {
                $location.search('v', 'allCategories');
            }

            $scope.subnavLinks = [{
                name: 'All Categories',
                link: 'allCategories',
                templateUrl: '/partials/all_categories'
            }, {
                name: 'Add Category',
                link: 'addCategory',
                templateUrl: '/partials/add_category'
            }];

            var getRequestParams = function getRequestParams(url) {
                var params = {},
                    pathStr = url.split('?')[0],
                    searchStr = url.split('?')[1];

                if(searchStr !== undefined) {
                    var paramsStr = searchStr.split('&');
                    for(var key in paramsStr) {
                        params[paramsStr[key].split('=')[0]] = paramsStr[key].split('=')[1];
                    }
                }
                return {
                    path: pathStr,
                    params: params
                };
            };

            $scope.$on('$locationChangeStart', function(event, newRoute, oldRoute) {
                var newLocationObject = getRequestParams(newRoute),
                    oldLocationObject = getRequestParams(oldRoute);

                if(newLocationObject.path === oldLocationObject.path) {
                    $scope.loadRoute(newLocationObject.params.v);
                }
            });

            $scope.subLinkActionCallback = function subLinkActionCallback(link) {
                if(!link) { return; }
                $location.search('v', link);
            };

            $scope.loadRoute = function loadRoute(link) {
                if(link === 'addCategory') {
                    $scope.currentRoute = '/partials/add_category';
                } else if(link === 'allCategories') {
                    $scope.currentRoute = '/partials/all_categories';
                }
            };

            $scope.loadRoute($routeParams.v);
    }]);