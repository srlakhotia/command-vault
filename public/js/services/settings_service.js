commandApp
    .service('SettingsService', ['$http', '$q', function($http, $q) {
        var serviceObj = {};

        serviceObj.getSettings = function() {
            var defer = $q.defer();
            $http.get('/getAllPreferences')
                .success(function(response) {
                    defer.resolve(response)
                })
                .error(function(error) {
                    defer.reject()
                });
            return defer.promise;
        }

        serviceObj.saveSettings = function(settingsObj) {
            var defer = $q.defer();
            settingsObj.defaultView = settingsObj.defaultView || 'category';
            $http.put('/savePreferences', settingsObj)
                .success(function(response) {
                    defer.resolve(response);
                })
                .error(function() {
                    defer.reject();
                });

            return defer.promise;
        };

        return serviceObj;
    }]);