'use strict';

angular.module('mobileWebApp')
    .controller('PhotoListController', ['$scope', '$http', function ($scope, $http) {
        var baseUrl = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';

        $http.get(baseUrl + "files/type/image").then(function (response) {
            $scope.images = response.data;
        });

        $scope.mediaPath = 'http://util.mw.metropolia.fi/uploads/';
    }]);