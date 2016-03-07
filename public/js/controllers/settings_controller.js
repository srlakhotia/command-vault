commandApp
    .controller('SettingsController', ['$scope', 'SettingsService', function($scope, SettingsService) {
        $scope.settings = {
            defaultView: 'category'
        };

        $scope.saveSettings = function() {
            SettingsService.saveSettings($scope.settings);
        };
    }]);