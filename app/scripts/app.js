'use strict';

var app = angular.module('mobileWebApp', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/main.html',
            controller: 'MainController',
            active: 'main'
        })
        .when('/video', {
            templateUrl: '/views/video-list.html',
            controller: 'VideoListController',
            active: 'video'
        })
        .when('/video/:fileId', {
            templateUrl: 'views/video-file.html',
            controller: 'VideoFileController',
            active: 'video'
        })
        .when('/music', {
            templateUrl: '/views/music-list.html',
            controller: 'MusicListController',
            active: 'music'
        })
        .when('/music/:fileId', {
            templateUrl: '/views/music-file.html',
            controller: 'MusicFileController',
            active: 'music'
        })
        .when('/photo', {
            templateUrl: '/views/photo-list.html',
            controller: 'PhotoListController',
            active: 'photo'
        })
        .when('/photo/:fileId', {
            templateUrl: '/views/photo-file.html',
            controller: 'PhotoFileController',
            active: 'photo'
        })
        .when('/upload', {
            templateUrl: '/views/upload.html',
            controller: 'UploadController',
            active: 'upload'
        })

    .otherwise('/');
});

app.filter('trusted', ['$sce', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
