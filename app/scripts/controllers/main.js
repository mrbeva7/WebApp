'use strict';

angular.module('mobileWebApp')
    .controller('MainController', ['$scope', 'MediaService', function ($scope, MediaService) {

        $scope.userData = MediaService.userData;

        $scope.$on('loginChange', function () {
            $scope.userData = MediaService.userData;
        });

    }]);