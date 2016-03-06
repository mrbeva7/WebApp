'use strict';
angular.module('mobileWebApp')
    .directive('comments', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/comments.html',
            scope: {
            	fileId: '=id'
            },
            controller: 'CommentsController'
        };

    });