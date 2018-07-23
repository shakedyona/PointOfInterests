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

.controller('allPoiController', ['$scope', '$rootScope','IndexService','loginService' ,'localStorageModel', 'all_poi', function($scope, $rootScope,IndexService,loginService ,localStorageModel,all_poi) {
  
  
  self.currPointA = IndexService.currPoint
  $scope.currPointB ='';

  $scope.sortType     = 'PointName'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchPoint   = '';     // set the default search/filter term
  $scope.isLoggedIn   =  $rootScope.object.isLoggedIndex;
  $scope.myFav = localStorageModel.getLocalStorage('favorits');
  $scope.favoritBoll = [];
  $scope.amsterdam = [];

  allpoint = all_poi.Points;
  allSplit = allpoint.split(";");

  i = allSplit.length-1;
  number = 1;

  for(x in allSplit){

    point = allSplit[x];
    pointsplit = point.split(',');
    pointname = pointsplit[0];
    categoryName = pointsplit[1];
    rating= pointsplit[2];
    parseRate = parseInt(rating)


    if(x<i){
      add = { id: number , PointName: pointname , category: categoryName , rate: parseRate};
      $scope.amsterdam.push(add);
      $scope.favoritBoll[number] = false;
    }

    number = number+1;
    
  }
    //favorits VS amsterdam----
    for(p in  $scope.amsterdam){
      for (fp in  $scope.myFav){
        if($scope.myFav[fp].PointName === $scope.amsterdam[p].PointName && $scope.myFav[fp].ifDelete===false) 
        {
          $scope.favoritBoll[$scope.amsterdam[p].id] = true;
        }
      }
    }
    console.log("here")

  /*  
  $scope.loginService = loginService;

  $scope.$watch('loginService.object',function(newValue,oldValue){
      if(newValue !== undefined){
          $scope.isLoggedIn = newValue.isLoggedService;
          
      }
  })*/

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
    
    //favorits VS amsterdam----
    for(p in  $scope.amsterdam){
        if(poi.PointName === $scope.amsterdam[p].PointName)
        {
          $scope.favoritBoll[$scope.amsterdam[p].id] = false;
        }
    }

    if(curr[x].PointName === poi.PointName)
    {
      favPoint = { id: curr[x].id , PointName: poi.PointName , order: curr[x].order , intoData: curr[x].intoData , ifDelete: true , ifOrder: curr[x].ifOrder};
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
  var ifNewFavoritePoint = true;
  var newId = "";
  var length = 1;

  for(x in curr){
    
    //favorits VS amsterdam----
    for(p in  $scope.amsterdam){
        if(poi.PointName === $scope.amsterdam[p].PointName)
        {
          $scope.favoritBoll[$scope.amsterdam[p].id] = true;
          newId = $scope.amsterdam[p].id;
        }
    }

    if(curr[x].PointName === poi.PointName)
    {
      favPoint = { id: curr[x].id , PointName: poi.PointName , order: curr[x].order , intoData: curr[x].intoData , ifDelete: false , ifOrder: curr[x].ifOrder};
      newFavToLocal.push(favPoint);
      ifNewFavoritePoint = false;
    }
    
    else{
      newFavToLocal.push(curr[x]);
    }
    length= length+1
  }

  console.log("length "+length);

  if(ifNewFavoritePoint === true){
    newfavPoint = { id: newId , PointName: poi.PointName , order: length+1 , intoData: false , ifDelete: false , ifOrder: false};
    newFavToLocal.push(newfavPoint);
  }

  localStorageModel.updateLocalStorage('favorits',newFavToLocal); 
};

var mymap = L.map('mapid').setView([	52.379189, 	4.899431], 13);
//var marker = L.marker([52.36264,4.92230]).addTo(mymap);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaGFkYXJoYXphbjkzIiwiYSI6ImNqaW4zOGpiNDA3NTQzcXBkZzZ6ZnRneDEifQ.7e6Qxz0wDzrxy8q87o6Q3Q'
}).addTo(mymap);

var greenIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png",

  iconSize:     [19, 47], // size of the icon
  shadowSize:   [25, 32], // size of the shadow
  iconAnchor:   [11, 47], // point of the icon which will correspond to marker's location
  shadowAnchor: [2, 31],  // the same for the shadow
  popupAnchor:  [-2, -38] // point from which the popup should open relative to the iconAnchor
});

L.marker([52.35828,4.88105], {icon: greenIcon}).addTo(mymap);
L.marker([52.35828,4.88105], {icon: greenIcon}).addTo(mymap).bindPopup("Van Gogh Museum");

L.marker([52.36264,4.92230], {icon: greenIcon}).addTo(mymap);
L.marker([52.36264,4.92230], {icon: greenIcon}).addTo(mymap).bindPopup("NEMO Science Museum");

L.marker([52.35793,4.87992], {icon: greenIcon}).addTo(mymap);
L.marker([52.35793,4.87992], {icon: greenIcon}).addTo(mymap).bindPopup("The Stedelijk Museum");

L.marker([52.37173, 4.91508], {icon: greenIcon}).addTo(mymap);
L.marker([52.37173, 4.91508], {icon: greenIcon}).addTo(mymap).bindPopup("The National Maritime Museum");

L.marker([52.37253, 4.89257], {icon: greenIcon}).addTo(mymap);
L.marker([52.37253, 4.89257], {icon: greenIcon}).addTo(mymap).bindPopup("Madame Tussauds");

L.marker([52.36682,4.89117], {icon: greenIcon}).addTo(mymap);
L.marker([52.36682,4.89117], {icon: greenIcon}).addTo(mymap).bindPopup("The Bloemenmarkt");

L.marker([52.37324,4.89264], {icon: greenIcon}).addTo(mymap);
L.marker([52.37324,4.89264], {icon: greenIcon}).addTo(mymap).bindPopup("Dam Square");

L.marker([52.35786,4.89172], {icon: greenIcon}).addTo(mymap);
L.marker([52.35786,4.89172], {icon: greenIcon}).addTo(mymap).bindPopup("Heineken N.V.");

L.marker([52.36770,4.90495], {icon: greenIcon}).addTo(mymap);
L.marker([52.36770,4.90495], {icon: greenIcon}).addTo(mymap).bindPopup("The Portuguese Synagogue");

L.marker([52.37335,4.89834], {icon: greenIcon}).addTo(mymap);
L.marker([52.37335,4.89834], {icon: greenIcon}).addTo(mymap).bindPopup("De Wallen");

L.marker([52.3746,4.8800 ], {icon: greenIcon}).addTo(mymap);
L.marker([52.3746,4.8800 ], {icon: greenIcon}).addTo(mymap).bindPopup("The Jordaan");

L.marker([52.37357,4.89029 ], {icon: greenIcon}).addTo(mymap);
L.marker([52.37357,4.89029 ], {icon: greenIcon}).addTo(mymap).bindPopup("Magna Plaza");

L.marker([52.37339,4.89396], {icon: greenIcon}).addTo(mymap);
L.marker([52.37339,4.89396], {icon: greenIcon}).addTo(mymap).bindPopup("De Bijenkorf");

L.marker([52.36951,4.90110], {icon: greenIcon}).addTo(mymap);
L.marker([52.36951,4.90110], {icon: greenIcon}).addTo(mymap).bindPopup("Waterlooplein");

L.marker([52.35493,4.88974], {icon: greenIcon}).addTo(mymap);
L.marker([52.35493,4.88974], {icon: greenIcon}).addTo(mymap).bindPopup("The Albert Cuyp Market");

L.marker([52.37768,4.89401], {icon: greenIcon}).addTo(mymap);
L.marker([52.37768,4.89401], {icon: greenIcon}).addTo(mymap).bindPopup("De Silveren Spiegel");

L.marker([52.36886,4.92177], {icon: greenIcon}).addTo(mymap);
L.marker([52.36886,4.92177], {icon: greenIcon}).addTo(mymap).bindPopup("Restaurant Vlaming");

L.marker([52.34867,4.89413], {icon: greenIcon}).addTo(mymap);
L.marker([52.34867,4.89413], {icon: greenIcon}).addTo(mymap).bindPopup("Ciel Bleu Restaurant");

L.marker([52.36923,4.88396], {icon: greenIcon}).addTo(mymap);
L.marker([52.36923,4.88396], {icon: greenIcon}).addTo(mymap).bindPopup("Vinkeles");

L.marker([52.35989,4.90523], {icon: greenIcon}).addTo(mymap);
L.marker([52.35989,4.90523], {icon: greenIcon}).addTo(mymap).bindPopup("La Rive");

}]);
