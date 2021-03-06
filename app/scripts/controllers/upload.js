'use strict';

angular.module('mobileWebApp')
    .controller('UploadController', function ($scope, AjaxFactory, MediaService) {    

        $scope.setMediaFile = function (element) {
            var file = element.files[0];
            $scope.formData.mimeType = file.type;
            $scope.formData.type = file.type.substr(0, 5);
            $scope.formData.filename = file.name;
            $scope.formData.name = file.name.match(/^[^\.]*/)[0] || '';
            $scope.formData.desc = 'My ' + $scope.formData.type;
            if ($scope.formData.type === 'image') {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $scope.image.src = e.target.result;
                };
                $scope.image.onload = $scope.resetImage;
                reader.readAsDataURL(file);
            }
            $scope.$digest();
        };

        $scope.isImage = function () {
            return $scope.formData.type === 'image';
        }

        $scope.isAudio = function () {
            return $scope.formData.type === 'audio';
        }

        $scope.isVideo = function () {
            return $scope.formData.type === 'video';
        }

        $scope.hasFile = function () {
            return !!$scope.formData.type;
        }

        $scope.isTab = function (tab) {
            return $scope.tab === tab;
        }

        $scope.setTab = function (tab) {
            $scope.tab = tab;
        }

        function upload(fd) {
            AjaxFactory
                .uploadFile(fd)
                .then(function (response) {
                    var fileId = response.fileId
                    if ($scope.isImage()) {
                        window.location.hash = '#/photo/' + fileId
                    } else if ($scope.isAudio()) {
                        window.location.hash = '#/music/' + fileId
                    } else if ($scope.isVideo()) {
                        window.location.hash = '#/video/' + fileId
                    }
                    $('#successfulUpload').modal();
                })
                .catch(function (error) {
                    $('#errorModal .error-msg').text(error);
                    $('#errorModal').modal();
                });
        }

        $scope.uploadFile = function () {
            var fd = new FormData(document.getElementById('fileForm'));
            upload(fd);
        }

        $scope.uploadImage = function () {
            var fd = new FormData();
            fd.append('title', $scope.formData.name);
            fd.append('description', $scope.formData.desc);
            fd.append('type', $scope.formData.type);
            fd.append('user', $scope.formData.userId);
            fd.append('file', $scope.dataURItoBlob($scope.canvas.toDataURL('image/png')), 'filename.png');
            upload(fd);
        };

        $scope.dataURItoBlob = function (dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0) {
                byteString = atob(dataURI.split(',')[1]);
            } else {
                byteString = decodeURI(dataURI.split(',')[1]);
            }
            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {
                type: mimeString
            });
        };

        $scope.setImageFile = function (element) {
            // get the image file from element
            // start to put the file into canvas element
            // fileReader
            // onload 
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.image.src = e.target.result;
            };
            reader.readAsDataURL(element.files[0]);
            $scope.image.onload = $scope.resetImage;
        };

        $scope.init = function () {
            // initialize default values for variables
            $scope.formData = {
                name: '',
                desc: '',
                type: '',
                mimeType: '',
                userId: MediaService.userData ? MediaService.userData.userId : null
            };
            $scope.tab = 'file';

            $scope.brightness = 0;
            $scope.contrast = 1;
            $scope.strength = 1;
            $scope.color = {
                red: 255,
                green: 189,
                blue: 0
            };
            $scope.autocontrast = false;
            $scope.vignette = false;
            $scope.canvas = angular.element('#myCanvas')[0];
            $scope.ctx = $scope.canvas.getContext('2d');
            $scope.image = new Image();

            $scope.vignImage = new Image();

        };

        $scope.init();

        $scope.resetImage = function () {
            // when image data is loaded, (after onload)
            // set size of canvas to match image size
            $scope.canvas.height = $scope.image.height;
            $scope.canvas.width = $scope.image.width;

            // put the data into canvas element
            $scope.ctx.drawImage($scope.image, 0, 0, $scope.canvas.width, $scope.canvas.height);

            // read pixel data
            $scope.imageData = $scope.ctx.getImageData(0, 0, $scope.canvas.width, $scope.canvas.height);
            $scope.pixels = $scope.imageData.data;
            $scope.numPixels = $scope.imageData.width * $scope.imageData.height;

            // load vignette image
            if ($scope.vignImage.src === '') {
                $scope.vignImage.onload = resetVign;
                $scope.vignImage.src = 'images/vignette.jpg';
            }

        };


        // Generic method for resetting image, applying filters and updating canvas
        $scope.applyFilters = function () {
            $scope.resetImage();

            setBrightness();
            setContrast();
            tint();

            if ($scope.vignette) {
                setVignette();
            }

            $scope.ctx.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
            $scope.ctx.putImageData($scope.imageData, 0, 0);
        };

        // FILTERS

        var setBrightness = function () {
            // type of input field value is string and must be parsed to int to make
            // numeric calculations instead of string concatenation
            var brightnessInt = parseInt($scope.brightness);
            // iterate through pixel array and modify values of each pixel one by one 
            for (var i = 0; i < $scope.numPixels; i++) {
                $scope.pixels[i * 4] += brightnessInt; // Red
                $scope.pixels[i * 4 + 1] += brightnessInt; // Green 
                $scope.pixels[i * 4 + 2] += brightnessInt; // Blue
            }
        };

        var setContrast = function () {
            // type of input field value is string and must be parsed to float to make
            // numeric calculations instead of string concatenation
            var contrastFloat = parseFloat($scope.contrast);
            // iterate through pixel array and modify rgb values of each pixel one by one 
            for (var i = 0; i < $scope.numPixels; i++) {
                $scope.pixels[i * 4] = ($scope.pixels[i * 4] - 128) * contrastFloat + 128; // Red
                $scope.pixels[i * 4 + 1] = ($scope.pixels[i * 4 + 1] - 128) * contrastFloat + 128; // Green
                $scope.pixels[i * 4 + 2] = ($scope.pixels[i * 4 + 2] - 128) * contrastFloat + 128; // Blue

            }
        };

        var tint = function () {
            for (var i = 0; i < $scope.numPixels; i++) {
                $scope.pixels[i * 4] = $scope.pixels[i * 4] + $scope.color.red * $scope.strength / 100; // Red
                $scope.pixels[i * 4 + 1] = $scope.pixels[i * 4 + 1] + $scope.color.green * $scope.strength / 100; // Green
                $scope.pixels[i * 4 + 2] = $scope.pixels[i * 4 + 2] + $scope.color.blue * $scope.strength / 100; // Blue
            }
        };

        var resetVign = function () {
            var cn = document.createElement('canvas');
            // make cn the same widht and height as the main image
            cn.width = $scope.image.width;
            cn.height = $scope.image.height;
            // get the context of cn
            var ctx = cn.getContext('2d');
            // draw the vignette image to ctx
            ctx.drawImage($scope.vignImage, 0, 0, $scope.vignImage.width, $scope.vignImage.height, 0, 0, cn.width, cn.height);


            $scope.vignData = ctx.getImageData(0, 0, cn.width, cn.height);
            $scope.vignPixels = $scope.vignData.data;
        };

        var setVignette = function () {
            // Po = Pi * Pv / 255;
            for (var i = 0; i < $scope.numPixels; i++) {
                $scope.pixels[i * 4] = $scope.pixels[i * 4] * $scope.vignPixels[i * 4] / 255; // Red
                $scope.pixels[i * 4 + 1] = $scope.pixels[i * 4 + 1] * $scope.vignPixels[i * 4 + 1] / 255; // Green
                $scope.pixels[i * 4 + 2] = $scope.pixels[i * 4 + 2] * $scope.vignPixels[i * 4 + 2] / 255; // Blue
            }
        };

        $scope.saveImage = function () {
            var imgAsDataUrl = $scope.canvas.toDataURL('image/png');
            return imgAsDataUrl;
        };

        $scope.$on("loginChange", function () {
            $scope.formData.userId = MediaService.userData ? MediaService.userData.userId : null;
        });

    })
    .config(function ($compileProvider) {

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|coui|data):/);
        // whitelists non-http: protocols. specifically we need data
    });