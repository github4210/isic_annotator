/**
 * Created by stonerri on 4/21/14.
 */

'use strict';

// Initialization of angular root application
var review_app = angular.module('DermApp', ['ngSanitize', 'mousetrap']);

var appController = review_app.controller('ApplicationController', ['$scope', '$rootScope', '$timeout', '$http',
    function ($scope, $rootScope, $timeout, $http) {

        $("#angular_id").height(window.innerHeight - 80);

        $scope.configurl = 'static/derm/decisiontree.json';


        $scope.step_options = [];

        $http.get($scope.configurl).then(function (response) {
            console.log(response)

            $scope.step_options = response.data
        });

        $scope.safeApply = function( fn ) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn) { fn(); }
            } else {
                this.$apply(fn);
            }
        };


    }]);



