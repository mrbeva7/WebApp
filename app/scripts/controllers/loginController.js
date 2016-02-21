'use strict';
angular.module('mobileWebApp')
    .controller('LoginController', function ($scope, AjaxFactory, MediaService) {

        $scope.login = function () {

            var data = {
                username: $scope.uname,
                password: $scope.pwd
            };

            var request = AjaxFactory.login(data);

            request.then(function (response) {
                console.log(response.data);
                MediaService.setVariable('userData', response.data);
                $scope.logged = true;
                localStorage.setItem("userID", response.data.userId);
            }, function (error) {
                console.log(error.data);
            });
        };

    });