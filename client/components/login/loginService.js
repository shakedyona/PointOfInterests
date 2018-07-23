angular.module('amsterdamApp')
.service('loginService',[ '$http','localStorageModel','$location', function ($http,localStorageModel,$location) {

    self = this;
    let serverUrl = 'http://localhost:3000/'
    self.object = {userNameService: "guest", isLoggedService: false }
    self.token = "";
    self.myFav= false;

    self.checkIfLogg = function () {
        const currName = localStorageModel.getLocalStorage('username')
        const currToken = localStorageModel.getLocalStorage('token')
        if(currName && currToken){
            self.object = {userNameService: currName , isLoggedService: true }
            $http.defaults.headers.common[ 'authorization' ] = "Bearer "+currToken;
        }
    }

    self.checkIfLogg();

    self.login = function (user) {
        console.log("login service ... ")
        return $http.post(serverUrl + "auth/login", user)
            .then(function (response) {
                console.log("here!!! " + response.data)
                self.token = response.data.token
                $http.defaults.headers.common[ 'authorization' ] = "Bearer "+self.token;
                $http.defaults.headers.delete = { 'Content-Type': 'application/json;charset=utf-8' };
                
                console.log("set token!!")
                localStorageModel.updateLocalStorage('token',response.data.token)
                localStorageModel.updateLocalStorage('username',user.username)
                self.object = {userNameService: user.username, isLoggedService: true  }
                return self.object;
            }, function(response){
                console.log("wrong!!!")
                alert(response.data.message);
            });

    }

    self.signOut = function () {
        $http.defaults.headers.common[ 'authorization' ] = "";
        localStorageModel.removeLocalStorage('token');
        localStorageModel.removeLocalStorage('username');
        localStorageModel.removeLocalStorage('favorits');
        self.object = {userNameService: "guest", isLoggedService: false  }
        self.myFav= false;        
        self.token = "";
        $location.path('/');
    }

    self.getMyFavorites = function(){
        if( localStorageModel.getLocalStorage('favorits') === null)
        {            
            return $http.post(serverUrl + "analy/getFavoritePoints")
            .then(function(response){               
                
                self.myFav = response.data
                allFavoriteFromData = [];
                allpoints = response.data.Points
                allSplits = allpoints.split(";");
                j = allSplits.length-1;
                for(x in allSplits){
            
                pointF = allSplits[x];
                pointsplitF = pointF.split(',');
                poiNameF = pointsplitF[0];
                FavoritIDF = pointsplitF[1];
                OrderIDF = pointsplitF[2];
            
                if(x<j){

                    //intodata = true && ifDelete = true =>delete from DB 
                    //intodata = false && ifDelete = false => insert to DB 
                    favPoint = { id: FavoritIDF , PointName: poiNameF , order: OrderIDF ,intoData: true , ifDelete: false , ifOrder: false};
                    allFavoriteFromData.push(favPoint);
                }
                
                }
                localStorageModel.updateLocalStorage('favorits',allFavoriteFromData);            
                return response.data
            }, function(response){
                console.log("wrong!!!")
            });
        }
    }

    if(self.object.isLoggedService === true){
        self.getMyFavorites();
    }

    self.getTopRecPointsToUser = function(){
        return $http.post(serverUrl + "analy/getTopRecPointsToUser")
        .then(function(response){
            return response.data
        }, function(response){
            console.log("wrong!!!")
        });
    }

    self.getLastFavoritsPointsToUser = function(){
        return $http.post(serverUrl + "analy/getLastFavoritsPointsToUser")
        .then(function(response){
            return response.data
        }, function(response){
            console.log("wrong!!!")
        });
    }

    self.deleteFromFavorits = function(point){
        console.log('loginService deleteFromFavorits...')
        return $http({
            url: serverUrl + "analy/deleteFromFavorits",
            method: 'delete',
            data: point
        })
        .then(function(response){
            console.log("deleteFromFavorits loginService "+response.data.message)
            return response.data
        }, function(response){
            console.log("wrong loginService deleteFromFavorits !!!")
        });
    }

    self.insertToFavorits = function(point){
        console.log('loginService insertToFavorits...')
        return $http.post(serverUrl + "analy/insertToFavorits", point)
        .then(function(response){
            return response.data
        }, function(response){
            console.log("wrong loginService insertToFavorits !!!")
        });
    }

    self.updateUserFavoritList = function(changArr){
        console.log('loginService updateUserFavoritList...')
        return $http.put(serverUrl + "analy/updateUserFavoritList", changArr)
        .then(function(response){
            return response.data
        }, function(response){
            console.log("wrong loginService insertToFavorits !!!")
        });
    }
}]);
