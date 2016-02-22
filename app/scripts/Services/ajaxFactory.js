/*

'use strict';

angular.module('mobileWebApp')
    .factory('AjaxFactory', function ($http, $httpParamSerializer) {
        var urlBase = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';
        var ajaxFunctions = {};

        ajaxFunctions.comments = function (args) {
            return $http.post(urlBase + 'comments', $httpParamSerializer(args), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };
    });
    
    
    */