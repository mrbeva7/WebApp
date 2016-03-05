'use strict';

angular.module('mobileWebApp')
    .controller('NavbarController', ['$scope', '$route', 'MediaService', function ($scope, $route, MediaService) {

        $scope.userData = MediaService.userData;

        $scope.active = function(page) {
            var active = $route.current ? $route.current.active : '';
            return page === active ? 'active' : '';
        };

        $scope.signOut = function () {
            MediaService.signOut();
        }

        $scope.$on('loginChange', function () {
            $scope.userData = MediaService.userData;
        });

    }]);
