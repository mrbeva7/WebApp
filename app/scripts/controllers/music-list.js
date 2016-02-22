'use strict';

angular.module('mobileWebApp')
    .controller('MusicListController', ['$scope', '$http', function ($scope, $http) {
        
        var baseUrl = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';
        
        $http({
            method: 'GET',
            url: baseUrl + 'files/type/audio'
        }).then(function(response) {
            $scope.audios = response.data;
        });
        
        $scope.mediaPath = 'http://util.mw.metropolia.fi/uploads/';
    }]);