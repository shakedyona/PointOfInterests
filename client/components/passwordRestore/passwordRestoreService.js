angular.module('amsterdamApp')
.service('passwordRestoreService',[ '$http','localStorageModel', function ($http,localStorageModel) {

self = this;
self.password = ''
let serverUrl = 'http://localhost:3000/'

self.restore = function (user) {
    // register user
    console.log('restore from service..')
    return $http.post(serverUrl + "auth/passwordRestore", user)
        .then(function (response) {
            self.password = response.data.ThePass           
        }, function (response) {
           // self.restore.content = "Something went wrong";
        });
}

}]);