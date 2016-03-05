'use strict';
angular.module('mobileWebApp')
    .factory('AjaxFactory', function ($http, $httpParamSerializer) {
        var urlBase = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';
        var ajaxFunctions = {};

        ajaxFunctions.uploadFile = function (args) {
            return $http.post(urlBase + 'upload', args, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            });
        };

        ajaxFunctions.register = function (args) {
            var username = args.username;
            var password = args.password;
            return $http
                .post(urlBase + 'register', $httpParamSerializer(args), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(function (response) {
                    if (response.data.error) {
                        // registration failed
                        throw new Error(response.data.error);
                    }
                    // login user
                    return ajaxFunctions.login({
                        username: username,
                        password: password
                    });
                });
        };

        ajaxFunctions.login = function (args) {
            return $http
                .post(urlBase + 'login', $httpParamSerializer(args), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(function (response) {
                    if (response.data.error) {
                        // login failed
                        throw new Error(response.data.error);
                    }
                    // get user data
                    return ajaxFunctions.getUser(response.data.userId);
                });
        };

        ajaxFunctions.getUser = function (userId) {
            return $http.get(urlBase + 'user/' + userId);
        }

        ajaxFunctions.fileByUser = function (args) {
            return $http.get(urlBase + 'files/user/' + args);
        };


        return ajaxFunctions;
    });
