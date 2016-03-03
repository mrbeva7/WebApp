'use strict';

angular.module('mobileWebApp')
    .controller('LikeController', ['$scope', '$http', function ($scope, $http) {

        var baseUrl = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';

        $http({
            method: 'GET',
            url: baseUrl + 'likes',


        }).then(function (response) {
            $scope.like = response.data;
            console.log(response.data);

        });
    }]);