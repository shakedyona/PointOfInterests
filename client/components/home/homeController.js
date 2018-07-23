angular.module('amsterdamApp')
.controller('homeController', ['$scope','IndexService', 'randomPoints' , function($scope ,IndexService , randomPoints ) {

  self.currPointA = IndexService.currPoint
  $scope.currPointB ='';

  $scope.randomPoint = randomPoints.randomPopular;

  $scope.getPoint = function(poi) {
    console.log('getPoint in from controller..')
    IndexService.getPoint(poi)
    .then((response, err) => {
        if(err)
            console.log("err");
        else{
          $scope.currPointB = response;
            }
        
    })
    .catch(function(err) {
      console.log("err");
    });   
};

 
    
  }]);

