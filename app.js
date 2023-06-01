var myApp = angular.module('Productportfolio', ['ngRoute']);

myApp.controller('ProductCtrl', ['$scope',function ($scope) {
  var vm = this;
}]);

myApp.controller('homeController', ['$scope', function($scope) {

}]);

myApp.controller('downloadController', ['$scope', function($scope) {

}]);

myApp.config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/home', {
                templateUrl: 'home.html',
                controller: 'ProductCtrl'
            })

            .when('/dashboard', {
                templateUrl: 'dashboard.html',
                controller: 'homeController'
            })
            .when('/private', {
                templateUrl: 'private.html',
                controller: 'ProductCtrl'
            })

            .when('/download', {
                templateUrl: 'download.html',
                controller: 'downloadController'
            })

            .otherwise({
                redirectTo: '/home',
                controller: 'ProductCtrl'
            });
}]);