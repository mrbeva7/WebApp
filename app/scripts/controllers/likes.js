'use strict';

angular.module('mobileWebApp')
    .controller('LikesController', ['$scope', '$http', 'MediaService', function ($scope, $http, MediaService) {

        var baseUrl = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';

        $scope.userId = MediaService.userData ? MediaService.userData.userId : null;

        $scope.$on("loginChange", function () {
            $scope.userId = MediaService.userData ? MediaService.userData.userId : null;
        });

        $scope.like = false;

        if ($scope.userId) {        
            $http({
                method: 'GET',
                url: baseUrl + 'likes/user/' + $scope.userId,
            }).then(function (response) {
                var likes = response.data;
                likes.forEach(function (like) {
                    if (String(like.fileId) === $scope.fileId) {
                        $scope.like = true;
                    }
                })
            });
        }

        $scope.likeClick = function () {
            $http({
                method: 'GET',
                url: baseUrl + ($scope.like ? 'unlike/' : 'like/') + $scope.fileId + '/' + $scope.userId,
            }).then(function (response) {
                $scope.like = !$scope.like;
            });
        }
    }]);