var myApp = angular.module('Productportfolio', ['ngRoute']);

myApp.controller('ProductCtrl', ['$scope',function ($scope) {
  var vm = this;
}]);

myApp.controller('GFGController', function ($scope, $location, $rootScope) {
        $rootScope.$on('$routeChangeStart', function () {
            $scope.mylocation = $location.path();
            console.log($location.path());
        });
});

myApp.controller('homeController', function($scope, $http) {
    // https://cpage.api.hungama.com/v1/page/content/62a2f12ec525a112440f8282/category/detail?category=tamil&alang=en&mlang=en&vlang=ta&device=ios&platform=a&storeId=1
    $http.get('http://127.0.0.1:5500/test.json')
        .then(function(response) {
            // Data retrieval successful
            $scope.jsonData = response.data;
            console.log($scope.jsonData);
            $scope.test = "working";
            console.log($scope.jsonData.data.body.rows)
        })
        .catch(function(error) {
            // Error occurred during data retrieval
            console.error('Error fetching JSON data:', error);
        });
});


myApp.config(['$routeProvider', function ($routeProvider) {        
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'homeController'
        })

        .when('/dashboard', {
            templateUrl: 'download.html',
            controller: 'GFGController'
        })

        .when('/download', {
            templateUrl: 'download.html',
            controller: 'GFGController'
        })

        .otherwise({
            redirectTo: '/',
            controller: 'ProductCtrl'
        });
}]);