'use strict';
angular.module('mobileWebApp')
    .controller('RegisterController', function ($scope, AjaxFactory, MediaService) {

        $scope.register = function () {

            var data = {
                username: $scope.uname,
                password: $scope.pwd,
                email: $scope.email
            };

            AjaxFactory.register(data)
                .then(function (response) {
                    MediaService.login(response.data);
                    $('#successfullRegistrationModal').modal();
                })
                .catch(function (error) {
                    $('#failedRegistrationModal .error-msg').text(error);
                    $('#failedRegistrationModal').modal();
                });
        };
    });
