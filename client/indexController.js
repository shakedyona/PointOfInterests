  angular.module('amsterdamApp')
    .controller('indexController', ['$scope','$rootScope' ,'IndexService','loginService',function ($scope ,  $rootScope ,IndexService,loginService) {
    
        $rootScope.object = { userNameIndex: "guest" , isLoggedIndex: false  }

        $scope.loginService = loginService;
        $scope.$watch('loginService.object',function(newValue,oldValue){
            if(newValue !== undefined){

                $rootScope.object.userNameIndex = newValue.userNameService;
                $rootScope.object.isLoggedIndex = newValue.isLoggedService;
               
            }
        })

        $scope.signOut = function() {
            loginService.signOut(); 
            $rootScope.object = { userNameIndex: "guest" , isLoggedIndex: false  }          
          };

    }]);

