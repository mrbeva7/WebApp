'use strict';
angular.module('mobileWebApp')
    .controller('LoginController', function ($scope, AjaxFactory, MediaService) {

        $scope.login = function () {

            var data = {
                username: $scope.uname,
                password: $scope.pwd
            };

            AjaxFactory.login(data)
                .then(function (response) {
                    MediaService.login(response.data);
                    $('#successfullLoginModal').modal();
                })
                .catch(function (error) {
                    $('#errorModal .error-msg').text(error);
                    $('#errorModal').modal();
                });
        };

    });