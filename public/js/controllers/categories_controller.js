commandApp
    .controller('CategoriesController', [
        '$scope',
        '$routeParams',
        '$location',
        'CategoryService',
        function($scope, $routeParams, $location, CategoryService){
            var linkArray = ['allCategories', 'addCategory'];

            if(!$routeParams.v || linkArray.indexOf($routeParams.v) === -1) {
                $location.search('v', 'allCategories');
            }

            $scope.subnavLinks = [{
                name: 'All Categories',
                link: 'allCategories'
            }, {
                name: 'Add Category',
                link: 'addCategory'
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
                    $scope.initCategoryForm();
                } else if(link === 'allCategories') {
                    $scope.currentRoute = '/partials/all_categories';
                    $scope.getAllCategories();
                }
            };

            $scope.initCategoryForm = function initCategoryForm() {
                $scope.categoryForm = {
                    name: '',
                    description: ''
                };
            };


            $scope.getAllCategories = function getAllCategories() {
                CategoryService.getAllCategories()
                    .then(function(response) {
                        console.log('response::: ', response);
                        $scope.allCategories = response;
                    });
            };

            $scope.getAllCategories();

            $scope.saveCategory = function() {
                CategoryService.saveCategory($scope.categoryForm)
                    .then(function(response) {
                        $location.search('v', 'allCategories');
                    })
                    .catch(function(err) {
                        console.log('err:: ', err)
                    })
            }

            $scope.loadRoute($routeParams.v);
    }]);