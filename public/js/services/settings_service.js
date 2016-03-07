commandApp
    .service('SettingsService', ['$http', function($http) {
        var serviceObj = {};

        serviceObj.saveSettings = function(settingsObj) {
            $http.post('/savePreferences', settingsObj)
                .success(function() {
                    console.log('in success')
                })
                .error(function() {
                    console.log('in error')
                });
        };

        return serviceObj;
    }]);