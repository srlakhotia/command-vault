/**
 * @license Angulartics v0.17.0
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * License: MIT
 */

/**
 * This file has been modified by Meltwater to support the turning off of integrations for the page and identify analytics calls.
 * GYDA-15237
 * Tim Flanders
 *
 */
(function(angular) {
    'use strict';

    /**
     * @ngdoc overview
     * @name angulartics.segment.io
     * Enables analytics support for Segment.io (http://segment.io)
     */
    angular.module('angulartics.segment.io', ['angulartics', 'AnalyticsHelperService'])
        .config(['$analyticsProvider', 'AnalyticsHelperServiceProvider', function ($analyticsProvider, AnalyticsHelperServiceProvider) {

            $analyticsProvider.registerPageTrack(function (path, $location) {
                AnalyticsHelperServiceProvider.runWhenReady(function () {
                    var name = AnalyticsHelperServiceProvider.getPageName(path);
                    var properties = {
                        path: path,
                        page_name: name
                    };
                    try {
                        var options = {
                            integrations: {
                                "Iron.io":false
                            }
                        };
                        analytics.page(properties,options);
                    } catch (e) {
                        if (!(e instanceof ReferenceError)) {
                            throw e;
                        }
                    }
                });
            });

            $analyticsProvider.registerEventTrack(function (action, properties) {
                try {
                    analytics.track(action, properties);
                } catch (e) {
                    if (!(e instanceof ReferenceError)) {
                        throw e;
                    }
                }
            });

        }])

        .run(['$rootScope', '$injector', 'AnalyticsHelperService', function ($rootScope, $injector, AnalyticsHelperService) {

            $rootScope.$on('analyticsUpdate', function () {
                AnalyticsHelperService.runWhenReady(function () {
                    var properties = {},
                        identity = AnalyticsHelperService.getUserIdentity(),
                        trackingUserCompanyDetail = AnalyticsHelperService.getAnalyticsDetail($injector),
                        properties = angular.extend(properties, trackingUserCompanyDetail);
                    if (identity !== null) {
                        var options = {
                            integrations: {
                                "Iron.io":false
                            }
                        };
                        analytics.identify(identity, properties,options);
                    }
                });
            });
        }]);
})(angular);