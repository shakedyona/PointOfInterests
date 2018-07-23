angular.module('amsterdamApp')
.controller('homeLoginController', ['$scope','IndexService','recPoints','favPoints', function($scope ,IndexService,recPoints,favPoints ) {
  
  self.currPointHomeLoginA = IndexService.currPoint
  $scope.currPointB ='';
  $scope.haveFav = false;

  $scope.recommedPointA = {PointName: recPoints.firstName, Image: recPoints.firstImage}
  $scope.recommedPointB = {PointName: recPoints.secondName, Image: recPoints.secondImage}

  if(favPoints !== undefined){
    $scope.haveFav = true;
    $scope.favoritePointA = {PointName: favPoints.firstName, Image: favPoints.firstImage}
    $scope.favoritePointB = {PointName: favPoints.secondName, Image: favPoints.secondImage}
  }



/////////////////////////////////////////////modal
    $scope.getPoint = function(poi) {
      console.log('getPoint in from controller..')
      IndexService.getPoint(poi)
      .then(function (response) {
        $scope.currPointB = response;
        }, function (response) {
          console.log("err");
        });
  };

    
  }]);

