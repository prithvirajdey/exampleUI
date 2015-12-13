'use strict';

angular.module('myApp.login', ['ngRoute','ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$cookies', '$http', function($cookies, $http) {
  
  var vm = this;
  vm.userId = "";
  vm.password = "";
  vm.message = "";
  
  vm.loginUser = function(){
    vm.message = "";
    if(vm.userId == "" || vm.password == ""){
      vm.message = "User ID / Password cannot be empty or blank";
      return;
    }
    sessionStorage.setItem("userId", vm.userId);
    $cookies.put("last_access_t","testTime");
    sessionStorage.setItem("lastLogin", "test");
    window.location.hash = '#/welcome'
  }
  

}]);