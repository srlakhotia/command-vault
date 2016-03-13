commandApp
    .service('CategoryService', ['$http', '$q', function($http, $q) {
        var serviceObj = {};

        serviceObj.getAllCategories = function() {
            var defer = $q.defer();

            $http.get('/getAllCategories')
                .success(function(response) {
                    defer.resolve(response);
                })
                .error(function(error) {
                    defer.reject(error);
                });

            return defer.promise;
        };

        serviceObj.saveCategory = function(categoryObj) {
            var defer = $q.defer();

            $http.post('/saveCategory', categoryObj)
                .success(function(response) {
                    defer.resolve(response);
                })
                .error(function(error) {
                    defer.reject(error);
                });

            return defer.promise;
        };

        return serviceObj;
    }]);