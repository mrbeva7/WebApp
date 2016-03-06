'use strict';
angular.module('mobileWebApp')
    .directive('likes', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/likes.html',
            scope: {
            	fileId: '=id'
            },
            controller: 'LikesController'
        };

    });