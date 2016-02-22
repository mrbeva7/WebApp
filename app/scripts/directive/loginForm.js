'use strict';
angular.module('mobileWebApp')
    .directive('loginForm', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/loginForm.html'
        };

    });