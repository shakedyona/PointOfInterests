angular.module('amsterdamApp')
.service('IndexService',[ '$http','localStorageModel', function ($http,localStorageModel) {
  
    
    self = this;    
    self.currPoint = 'false-currPoint'
    thresH = {threshold: '50'};
    

  /* self.directToPOI = function () {
        $location.path('/allPoi')
    }*/

    let serverUrl = 'http://localhost:3000/'

    self.register = function (user) {
        // register user
        console.log('register to sign up in from service..')
        return $http.post(serverUrl + "auth/register", user)
        .then(function (response) {
            console.log("response.data.message"+response.data.message);
            if(response.data.message === 'true')
            {
                return true;
            }
            return false

        }, function (response) {
            console.log("Something went wrong");
            return false;
        });

    }

    self.getAllPoints = function(){
        return $http.get(serverUrl + "else/getAllPoints")
        .then(function(response){
            return response.data
        }, function(response){
            console.log("wrong!!!")
        });
    }

    
    self.getCategories = function(){
        console.log('getAllcategories...')
        return $http.get(serverUrl + "else/getCategories")
        .then(function(response){
            return response.data
        }, function(response){
            console.log("wrong!!!")
        });
    }
    
    self.getRandomPopularPoints = function () {
        console.log('getPoint from service..'+thresH.threshold)
        return $http.post(serverUrl + "else/getRandomPopularPoints", thresH)
            .then(function (response) {
                return response.data
            }, function (response) {
                self.getPoint.content = "Something went wrong";
            });
    }

    self.getPoint = function (point) {
        return $http.post(serverUrl + "else/getPoint", point)
            .then(function (response) {
                self.currPoint =  response.data
                return response.data;

            }, function (response) {
                self.getPoint.content = "Something went wrong";
            });
    }


   /* self.addTokenToLocalStorage = function () {
        localStorageModel.addLocalStorage('token', self.login.content)
    }*/



}]);


