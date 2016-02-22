'use strict';

var app = angular.module('mobileWebApp');
app.controller('MusicFileController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    var baseUrl = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';

    $http({
        method: 'GET',
        url: baseUrl + 'file/' + $routeParams.fileId
    }).then(function (response) {
        $scope.audio = response.data;

        $http({
            method: 'GET',
            url: baseUrl + 'user/' + $scope.audio.userId
        }).then(function (response) {
            $scope.user = response.data;
        });
    });

    $scope.mediaPath = 'http://util.mw.metropolia.fi/uploads/';

    }]);