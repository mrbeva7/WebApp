'use strict';

var app = angular.module('mobileWebApp');
app.controller('PhotoFileController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    var baseUrl = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';

    $http({
        method: 'GET',
        url: baseUrl + 'file/' + $routeParams.fileId
    }).then(function (response) {
        $scope.image = response.data;

        $http({
            method: 'GET',
            url: baseUrl + 'user/' + $scope.image.userId
        }).then(function (response) {
            $scope.user = response.data;
        });
    });

    $scope.mediaPath = 'http://util.mw.metropolia.fi/uploads/';

  }]);