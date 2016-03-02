'use strict';

angular.module('mobileWebApp')
    .controller('CommentController', ['$scope', '$http', function ($scope, $http) {

        var baseUrl = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';

        $http({
            method: 'GET',
            url: baseUrl + 'comments/file/' + $scope.fileId,
            headers: {
                'content-type': "application/x-www-form-urlencoded"
            }

        }).then(function (response) {
            $scope.comment = response.data;

        });
    }]);