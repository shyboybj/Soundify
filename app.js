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
    $scope.playlist = [];
      
    // Audio player
    var audioPlayer = document.getElementById('audioPlayer');
    var currentIndex = 0;
    
    function playAudio(index) {
        if (index >= 0 && index < $scope.playlist.length) {
            if ($scope.playlist[index].audio == "") {
                $http.get('https://curls.api.hungama.com/v1/content/'+$scope.playlist[index].id+'/url/playable?contentType=4&alang=en&mlang=en&vlang=ta&device=web&platform=a&storeId=1&uid=1177036924')
                .then(function(response) {
                    $scope.playlist[index].audio = response.data.data.body.data.url.playable[2].data;
                    console.log($scope.playlist);
                });
            }
            
            audioPlayer.src = $scope.playlist[index].audio;
            audioPlayer.play();
            currentIndex = index;

            document.querySelector('.Rj38soYIO7xO9JyFZM7x').style.display = 'grid';
            document.querySelector('.Rj38soYIO7xO9JyFZM7x img').src = $scope.playlist[index].image;
            document.querySelector('.HJpr0Ykhb_GbZUePKH3r span').innerHTML = $scope.playlist[index].title;
            document.querySelector('span.eMzEmF.VRq4id4IImgH9ykK7Gj1').innerHTML = $scope.playlist[index].subtitle;
            $scope.playlist[index].played = true;

            // If the subtitle is larger than 171PX Then add the Scroll Animation
            var subTitleTag = document.querySelector("span.eMzEmF.VRq4id4IImgH9ykK7Gj1")
            var TitleTag = document.querySelector(".HJpr0Ykhb_GbZUePKH3r span")
            if(subTitleTag.clientWidth > TitleTag.clientWidth) {
                subTitleTag.classList.add("marquee");
            }
        }
    }
      
    audioPlayer.addEventListener('ended', function() {
        var nextIndex = currentIndex + 1;
        if($scope.playlist.length == nextIndex) {
            nextIndex = 0;
        }
        playAudio(nextIndex);
    });      

    // https://cpage.api.hungama.com/v1/page/content/62a2f12ec525a112440f8282/category/detail?category=tamil&alang=en&mlang=en&vlang=ta&device=ios&platform=a&storeId=1
    $http.get('https://cpage.api.hungama.com/v1/page/content/62a2f12ec525a112440f8282/category/detail?category=tamil&alang=en&mlang=en&vlang=ta&device=ios&platform=a&storeId=1')//http://127.0.0.1:5500/test.json')
        .then(function(response) {
            // Data retrieval successful
            $scope.jsonData = response.data;
        })
        .catch(function(error) {
            // Error occurred during data retrieval
            console.error('Error fetching JSON data:', error);
        });
    
    $scope.AddToQueue = function(id) {
        console.log(id);
        if (id.startsWith("playlist-")) {
            $http.get('https://page.api.hungama.com/v2/page/content/'+ id.replace("playlist-", "") +'/playlist/detail?contentType=4&alang=en&mlang=en&vlang=ta&device=web&platform=a&storeId=1&uid=1177036924')
            .then(function(response) {
                var songList = response.data.data.body.rows;
                for(i = 0; i < songList.length; i++) {
                    $scope.playlist.push(
                        {
                            "id":songList[i].data.id,
                            "title":songList[i].data.title,
                            "subtitle":songList[i].data.subtitle,
                            "image":songList[i].data.image,
                            "audio":"",
                            "played":false
                    });
                }

                $http.get('https://curls.api.hungama.com/v1/content/'+songList[0].data.id+'/url/playable?contentType=4&alang=en&mlang=en&vlang=ta&device=web&platform=a&storeId=1&uid=1177036924')
                .then(function(response) {
                    $scope.playlist.push(
                        {
                            "id":songList[0].data.id,
                            "title":response.data.data.head.data.title,
                            "subtitle":response.data.data.head.data.subtitle,
                            "image":response.data.data.head.data.image,
                            "audio":response.data.data.body.data.url.playable[2].data,
                            "played":false
                        });
                        console.log($scope.playlist);
                        
                        // Play the first audio when the controller loads
                        playAudio(0);
                })
                .catch(function(error) {
                    // Error occurred during data retrieval
                    console.error('Error fetching JSON data:', error);
                });
            })
            .catch(function(error) {
                // Error occurred during data retrieval
                console.error('Error fetching JSON data:', error);
            });
        } else {
            $scope.playlist = [];
            $http.get('https://curls.api.hungama.com/v1/content/'+id+'/url/playable?contentType=4&alang=en&mlang=en&vlang=ta&device=web&platform=a&storeId=1&uid=1177036924')
            .then(function(response) {
                $scope.playlist.push(
                    {
                        "id":id,
                        "title":response.data.data.head.data.title,
                        "subtitle":response.data.data.head.data.subtitle,
                        "image":response.data.data.head.data.image,
                        "audio":response.data.data.body.data.url.playable[2].data,
                        "played":false
                    });
                    console.log($scope.playlist);
                    
                    // Play the first audio when the controller loads
                    playAudio(0);
            })
            .catch(function(error) {
                // Error occurred during data retrieval
                console.error('Error fetching JSON data:', error);
            });
            // console.log($scope.playlist);
        }
    }

    $scope.isExcluded = function(heading) {
        var excludedWords = ['radio', 'podcasts', 'video'];
        var lowerCaseHeading = heading.toLowerCase();
          
        for (var i = 0; i < excludedWords.length; i++) {
            if (lowerCaseHeading.indexOf(excludedWords[i]) !== -1) {
                return true;
            }
        }
        return false;
    };
          
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