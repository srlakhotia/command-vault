commandApp
    .controller('SettingsController', ['$scope', 'SettingsService', function($scope, SettingsService) {
        $scope.settings = {};

        SettingsService.getSettings().then(function(response) {
            if(!response) {
                response = {
                    defaultView: 'category'
                }
            }
            $scope.settings = response;
        });

        $scope.saveSettings = function() {
            SettingsService.saveSettings($scope.settings)
                .then(function(response) {
                    $scope.settings = response;
                });
        };
    }]);