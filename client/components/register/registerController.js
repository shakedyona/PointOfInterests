angular.module('amsterdamApp')
.controller('registerController', ['$scope','$location','IndexService',  'all_cat', function($scope,$location,IndexService, all_cat ) {

	var allcat = [];
  allcat = all_cat.categories;
	$scope.categories = [];
	$scope.myCat = [];

  for(x in allcat){
    $scope.categories[x] = allcat[x].CategoryName;
	}

	$scope.countries = [];
	console.log('loadXMLDoc..')
	var file,xmlhttp,xmlDoc
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "components/register/countries.xml", false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML; 
	file = xmlDoc.getElementsByTagName("Country");

	for (i = 0; i <file.length; i++) { 
			$scope.countries.push(file[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue) ;
	}

	$scope.addMyCat = function(category) {
		$scope.myCat.push(category);
	}

//	$scope.items = [1,2,3,4,5];
  $scope.selected = [];

  $scope.toggle = function (item, list) {
		var idx = list.indexOf(item);
		if (idx > -1) {
			list.splice(idx, 1);
		}
		else {
			list.push(item);
		}
	};

  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

	////////////////////////////////need add categories to user!!!!

	
	$scope.submitForm = function(isValid) {
    // check to make sure the form is completely valid
    if (isValid) {
			console.log('submitForm in from controller..')	
			$scope.user.category1 = $scope.selected[0];
			$scope.user.category2 = $scope.selected[1];
			$scope.user.category3 = $scope.selected[2];
			$scope.user.category4 = $scope.selected[3];
			$scope.register();
		}
		else{
			alert("Something went wrong");
		}

	};


	$scope.register = function() {
		console.log('register in from controller..')
			IndexService.register($scope.user)
			.then(function (response) {
				if(response === true)
				{
					$location.path('/');
				}
				else{
						alert("Something went wrong")
				}

		}, function (response) {
				self.getPoint.content = "Something went wrong";
		}); 
	};
	

/*
  var allcat = [];
  allcat = all_cat.categories;
  $scope.categories = [];

  for(x in allcat){
    $scope.categories[x] = allcat[x].CategoryName;
  }

    $scope.names = [];
    

    $scope.register = function() {
      console.log('register in from login controller..')
        IndexService.register($scope.user)
        .then((response, err) => {
            if(err)
                console.log("err");            
            else{
                  $location.path('/homeLogin');
                }
            
        })
        .catch(function(err) {
          console.log("err");
        });   
    };

    console.log('loadXMLDoc..')
    var file,xmlhttp,xmlDoc
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "components/register/countries.xml", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML; 
    file = xmlDoc.getElementsByTagName("Country");

    for (i = 0; i <file.length; i++) { 
        $scope.names.push(file[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue) ;
		}
		*/
    
  }]);


