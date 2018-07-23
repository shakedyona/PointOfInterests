angular.module('amsterdamApp')
.filter('unique',function(){
  return function(collection,keyname){
    var output = [];
    var keys = [];
    angular.forEach(collection,function(item){
      var key = item[keyname];
      if(keys.indexOf(key) === -1){
        keys.push(key);
        output.push(item);
      }
    });
    return output;
  };
})

.controller('favoriteController', ['$scope','loginService' ,'IndexService','localStorageModel', 'all_fav','$route', function($scope,loginService,IndexService,localStorageModel ,all_fav,$route) {
  
  self = this;
  self.currPointA = IndexService.currPoint
  $scope.currPointB ='';
  $scope.sortType     = 'id'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.favoritBollArr = [];
  $scope.favorites = [];
  var arrayPoi = [];


$scope.favorites = localStorageModel.getLocalStorage('favorits');

for (fp in  $scope.favorites){

  if($scope.favorites[fp].ifDelete===false){
    $scope.favoritBollArr[$scope.favorites[fp].id] = true;
  }
    
}

  $scope.getPoint = function(poi) {
    console.log('getPoint in from controller..')
    IndexService.getPoint(poi)
    .then((response, err) => {
        if(err)
            console.log("err");
        else{
          $scope.currPointB = self.currPoint;
          console.log("ans: "+self.currPoint.PointName);
            }
        
    })
    .catch(function(err) {
      console.log("err");
    });   
};

$scope.delete = function(poi) {
  console.log('delete in from controller..')  
  var curr = localStorageModel.getLocalStorage('favorits'); 
  newFavToLocal = [];
  for(x in curr){

    if(curr[x].PointName === poi.PointName)
    {
      $scope.favoritBollArr[curr[x].id] = false;
      favPoint = { id: curr[x].id , PointName: poi.PointName , order: curr[x].order , intoData: curr[x].intoData , ifDelete: true, ifOrder: curr[x].ifOrder};
      newFavToLocal.push(favPoint);
    }    
    else{
      newFavToLocal.push(curr[x]);
    }
  }

  localStorageModel.updateLocalStorage('favorits',newFavToLocal); 

};


$scope.insert = function(poi) {
  console.log('insert in from controller..') 
  var curr = localStorageModel.getLocalStorage('favorits'); 
  newFavToLocal = [];

  for(x in curr){
    
    if(curr[x].PointName === poi.PointName)
    {
      $scope.favoritBollArr[curr[x].id] = true;
      favPoint = { id: curr[x].id , PointName: poi.PointName , order: curr[x].order , intoData: curr[x].intoData , ifDelete: false , ifOrder: curr[x].ifOrder};
      newFavToLocal.push(favPoint);
    } 
    
    else{
      newFavToLocal.push(curr[x]);
    }

  }

  localStorageModel.updateLocalStorage('favorits',newFavToLocal); 

};

$scope.saveFavorite = function() {
  console.log('saveFavorite..') 
  var curr = localStorageModel.getLocalStorage('favorits'); 
  var chang = "";

  for(x in curr){

    //chang order
    if(curr[x].intoData === true && curr[x].ifDelete === false && curr[x].ifOrder === true)
    {
      //chang = chang+curr[x].PointName+":"+curr[x].order+",";
      chang = chang+curr[x].PointName+":"+curr[x].order;
      changArr = { Orders: chang }
      console.log('chang order..' + chang)
      loginService.updateUserFavoritList(changArr)
      .then((response, err) => {
          if(err)
              console.log("err");            
          else{
                console.log("updateUserFavoritList in controller"); 
                localStorageModel.removeLocalStorage('favorits');
                $route.reload();  
              }
          
      })
      .catch(function(err) {
        console.log("err");
      });
    }

     //delete from DB
     if(curr[x].intoData === true && curr[x].ifDelete === true)
     {
      console.log('delete from DB..') 
       loginService.deleteFromFavorits(curr[x])
       .then((response, err) => {
           if(err)
               console.log("err");            
           else{
                 console.log("delete into save"); 
                 localStorageModel.removeLocalStorage('favorits');
                $route.reload();  
               }
           
       })
       .catch(function(err) {
         console.log("err");
       });
     }

    //insert to DB
    else if(curr[x].intoData === false && curr[x].ifDelete === false)
    {
      console.log('insert to DB..') 
      loginService.insertToFavorits(curr[x])
      .then((response, err) => {
          if(err)
              console.log("err");            
          else{
                console.log("insert into save"); 
                localStorageModel.removeLocalStorage('favorits');
                $route.reload(); 
              }
          
      })
      .catch(function(err) {
        console.log("err");
      });
    }
     
  }
  

};
$scope.changOrder = function(poi) {
  console.log('changOrder in from controller..') 
  
  var curr = localStorageModel.getLocalStorage('favorits'); 
  newFavToLocal = [];

  for(x in curr){
    
    if(curr[x].PointName === poi.PointName)
    {

      favPoint = { id: curr[x].id , PointName: poi.PointName , order: poi.order , intoData: curr[x].intoData , ifDelete:  curr[x].ifDelete , ifOrder: true};
      newFavToLocal.push(favPoint);
    } 
    
    else{
      newFavToLocal.push(curr[x]);
    }

  }

  localStorageModel.updateLocalStorage('favorits',newFavToLocal); 

};




  
}]);
