angular.module('amsterdamApp')
.controller('loginController', ['$scope','$rootScope' ,'$location','$window', 'loginService', function($scope ,$rootScope, $location ,$window,loginService ) {

  $scope.user = {}

  $scope.login = function() {
    console.log('logging in from login controller..')
    if($scope.user.username === undefined || $scope.user.password === undefined )
    {
      $window.alert("You must complete the fields");	
    }
    else{
        loginService.login($scope.user)
        .then(function (response) {
          if(response !== undefined){
            $rootScope.object.isLoggedIndex = true;
            $rootScope.object.userNameIndex = $scope.user.username ;
            $location.path('/homeLogin');
          }          

      }, function (response) {
          console.log("Something went wrong");
          $window.alert("The username or password is incorrect !! ");
      });
    }
  };

  
  }]);

 
      
  

