'use strict';

angular.module('mobileWebApp')
    .controller('VideoListController', ['$scope', '$http', function ($scope, $http) {
        
        var baseUrl = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';
        
        $http({
            method: 'GET',
            url: baseUrl + 'files/type/video'
        }).then(function(response) {
            $scope.videos = response.data;
        });
        
        $scope.mediaPath = 'http://util.mw.metropolia.fi/uploads/';
    }]);