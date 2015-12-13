'use strict';

angular.module('myApp.welcome', ['ngRoute','ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/welcome', {
    templateUrl: 'welcome/welcome.html',
    controller: 'WelcomeCtrl'
  });
}])

.controller('WelcomeCtrl', ['$cookies', '$http', function($cookies, $http) {
  
  //TODO Code for redirect if not authenticated
  
  var vm = this;
  vm.userId = "";
  vm.lastLogin = "";
  vm.message = "";
  vm.auth = false;
  
  if(sessionStorage.getItem("userId") != null){
    vm.auth = true;
    vm.userId = sessionStorage.getItem("userId");
    // vm.lastLogin = sessionStorage.getItem("lastLogin");
    vm.lastLogin = $cookies.get("last_access_t");
  }
  
  vm.logoutUser = function(){
    console.log('Logging out');
    vm.userId = "";
    vm.lastLogin = "";
    vm.auth = false;
    sessionStorage.setItem("userId", null);
    sessionStorage.setItem("lastLogin",null);
  }

}]);