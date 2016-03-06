'use strict';

var app = angular.module('mobileWebApp');
app.controller('VideoFileController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    var baseUrl = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';

    $http({
        method: 'GET',
        url: baseUrl + 'file/' + $routeParams.fileId
    }).then(function (response) {
        $scope.video = response.data;

        $http({
            method: 'GET',
            url: baseUrl + 'user/' + $scope.video.userId
        }).then(function (response) {
            $scope.user = response.data;
        });
    });

    $scope.fileId = $routeParams.fileId;
    $scope.mediaPath = 'http://util.mw.metropolia.fi/uploads/';

    }]);