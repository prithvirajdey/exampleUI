'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', ['$http', function($http) {
  
  var vm = this;
  vm.userId = "";
  vm.password = "";
  vm.message = "";
  
  vm.registerUser = function(){
    vm.message = "";
    // Validations
    if(vm.userId == "" || vm.password == ""){
      vm.message = "User ID / Password cannot be empty or blank";
      return;
    }
    // Set data and call REST service
      var userData = {};
      userData.userId = vm.userId;
      userData.password = vm.password;
    
    return $http.post(`http://localhost:8080/LoginServices/rest/services/register`, userData)
        .then(function (response) {
          if (response.data.error == null) {
              vm.message = response.data.message;
          }
          else{
            vm.message = response.data.error;
          }



        }).catch(function (response) {
          // console.log(response);
          if (response.data != null) {
            vm.message = response.data.error;
          }
        });
  }

}]);