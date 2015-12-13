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
    if(vm.userId == "" || vm.password == ""){
      vm.message = "User ID / Password cannot be empty or blank";
      return;
    }
  }

}]);