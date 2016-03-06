'use strict';

angular.module('mobileWebApp')
    .controller('CommentsController', ['$scope', '$http', 'MediaService', '$httpParamSerializer', function ($scope, $http, MediaService, $httpParamSerializer) {

        var baseUrl = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';

        $scope.getComments = function () {
            $http({
                method: 'GET',
                url: baseUrl + 'comments/file/' + $scope.fileId,
                headers: {
                    'content-type': "application/x-www-form-urlencoded"
                }

            }).then(function (response) {
                $scope.comments = response.data;
            });
        };

        $scope.getComments();

        $scope.input = {
            comment: ''
        };

        $scope.userId = MediaService.userData ? MediaService.userData.userId : null;

        $scope.$on("loginChange", function () {
            $scope.userId = MediaService.userData ? MediaService.userData.userId : null;
        });

        $scope.commentFile = function () {
            $http.post(
                baseUrl + 'comment/file/' + $scope.fileId,
                $httpParamSerializer({
                    user: $scope.userId,
                    comment: $scope.input.comment
                }),
                {
                    headers: {
                        'content-type': "application/x-www-form-urlencoded"
                    }
                }
            ).then(function (response) {
                if (response.data.error) {
                    $('#errorModal .error-msg').text(response.data.error);
                    $('#errorModal').modal();
                } else {
                    $scope.input.comment = '';
                }
                $scope.getComments();
            });
        };

    }]);