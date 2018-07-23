angular.module('amsterdamApp')
.controller('passwordRestoreController', ['$scope','passwordRestoreService', function($scope ,passwordRestoreService ) {

    //$scope.password = 'nada';
    self = this;
    $scope.user = {}
    self.password = passwordRestoreService.password

    $scope.restore = function() {
        console.log('restore in from controller..')
        passwordRestoreService.restore($scope.user)
    };
    
  }]);