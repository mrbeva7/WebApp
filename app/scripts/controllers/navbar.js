'use strict';

angular.module('mobileWebApp')
    .controller('NavbarController', ['$scope', '$route', function ($scope, $route) {

        $scope.active = function(page) {
            var active = $route.current ? $route.current.active : '';
            return page === active ? 'active' : '';
        };
    }]);