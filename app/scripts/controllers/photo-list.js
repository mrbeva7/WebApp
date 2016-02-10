'use strict';

angular.module('mobileWebApp')
    .controller('PhotoListController', function ($scope) {
        console.log('Photo!');
        
        $scope.mediaPath = 'http://util.mw.metropolia.fi/uploads/';
    });