angular.module('amsterdamApp')
.controller('aboutController', ['$scope', function($scope) {

    var caro =angular.element(document.querySelector('#myCarousel'))

    $scope.prev = function(){
      caro.carousel('prev')
    }
    $scope.next = function(){
      caro.carousel('next')
    }

    $scope.count = 0;
    $scope.myFunc = function() {
      $scope.count++;
    };
  }]);