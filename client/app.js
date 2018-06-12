let app = angular.module('amsterdamApp', ["ngRoute"]);


//before app run
app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller : 'homeController as homeCtrl'
    })
    .when('/about', {
        templateUrl: 'views/about.html',
        controller : 'aboutController as abtCtrl'
    })
    .when('/poi', {
        templateUrl: 'views/poi.html',
        controller : 'poiController as poiCtrl'
    })
    .when('/register', {
        templateUrl: 'views/register.html',
        controller : 'registerController as registerCtrl'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller : 'loginController as loginCtrl'
    })
    .when('/favorite', {
        templateUrl: 'views/favorite.html',
        controller : 'favoriteController as favoriteCtrl'
    })
    .when('/homeLogin', {
        templateUrl: 'views/homeLogin.html',
        controller : 'homeLoginController as homeLoginCtrl'
    })
    .when('/passwordRestore', {
        templateUrl: 'views/passwordRestore.html',
        controller : 'passwordRestoreController as passwordRestoreCtrl'
    })
    .when('/allPoi', {
        templateUrl: 'views/allPoi.html',
        controller : 'allPoiController as allPoiCtrl'
    })


    .otherwise({ redirectTo: '/' });

        
}]);


/*let app = angular.module('amsterdamApp', ["ngRoute", 'LocalStorageModule']);


//before app run
app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        template: '<h1>This is the default route</h1>'
    })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller : 'aboutController as abtCtrl'
        })
        .when('/poi', {
            templateUrl: 'views/poi.html',
            controller : 'poiController as poiCtrl'
        })
        .otherwise({ redirectTo: '/' });

        
}]);

*/











