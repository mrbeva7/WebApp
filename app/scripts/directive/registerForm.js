'use strict';
angular.module('mobileWebApp')
    .directive('registerForm', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/registerForm.html',
            controller: 'RegisterController'
        };

    });