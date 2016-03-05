'use strict';
angular.module('mobileWebApp')
    .service('MediaService', function ($rootScope) {

        function getUserData() {
            if (localStorage.getItem('userId')) {
                return {
                    username: localStorage.getItem('username'),
                    email: localStorage.getItem('email'),
                    userId: localStorage.getItem('userId')
                };
            } else {
                return null;
            }
        }

        var mediaVariables = {
            mediaUrl: 'http://util.mw.metropolia.fi/uploads/',
            userData: getUserData()
        };

        function setUserData(userData) {
            mediaVariables.userData = userData;
            localStorage.setItem('username', userData.username);
            localStorage.setItem('email', userData.email);
            localStorage.setItem('userId', userData.userId);
        }

        function removeUserData() {
            mediaVariables.userData = null;
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
        }

        mediaVariables.login = function (userData) {
            setUserData(userData);
            $rootScope.$broadcast('loginChange');
        }

        mediaVariables.signOut = function () {
            removeUserData();
            $rootScope.$broadcast('loginChange');
        }

        return mediaVariables;
    });