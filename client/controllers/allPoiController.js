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


.controller('allPoiController', ['$scope', function($scope) {
  $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchPoint   = '';     // set the default search/filter term
  
  // create the list of point
  $scope.amsterdam = [
    { name: 'Dam Square', category: 'Attractions', rate: 30},
    { name: 'Van Gogh Museum', category: 'Museums', rate: 45 },
    { name: 'Waterlooplein', category: 'Shopping', rate: 80 },
  ];
 
  
}]);

/*angular.module('amsterdamApp')
.controller('allPoiController', ['$scope', '$filter', function($scope,$filter) {
  $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchPoint   = '';     // set the default search/filter term
  
  // create the list of point
  $scope.amsterdam = [
    { name: 'Dam Square', category: 'Attractions', rate: 30},
    { name: 'Van Gogh Museum', category: 'Museums', rate: 45 },
    { name: 'Waterlooplein', category: 'Shopping', rate: 80 },
  ];
 
  
}])

.filter('myStrictFilter', function($filter){
  return function(input, predicate){
      return $filter('filter')(input, predicate, true);
  }
})


.filter('unique', function() {
  return function (arr, field) {
      var o = {}, i, l = arr.length, r = [];
      for(i=0; i<l;i+=1) {
          o[arr[i][field]] = arr[i];
      }
      for(i in o) {
          r.push(o[i]);
      }
      return r;
  };
})




;
*/