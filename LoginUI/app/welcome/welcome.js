'use strict';

angular.module('myApp.welcome', ['ngRoute','ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/welcome', {
    templateUrl: 'welcome/welcome.html',
    controller: 'WelcomeCtrl'
  });
}])

.controller('WelcomeCtrl', ['$cookies', '$http', function($cookies, $http) {
  
  var vm = this;
  vm.userId = "";
  vm.lastLogin = "";
  vm.message = "";
  vm.auth = false;
  
    // Code for redirect if not authenticated  
  if(sessionStorage.getItem("userId") != null && sessionStorage.getItem("userId") != 'null'){
  // if($cookies.get("userId") != null && $cookies.get("userId") != undefined){
    vm.auth = true;
    vm.userId = sessionStorage.getItem("userId");
    vm.lastLogin = sessionStorage.getItem("last_access_t");
    // vm.userId = $cookies.get("userId");
    // vm.lastLogin = $cookies.get("last_access_t");
  }
  
  vm.logoutUser = function(){
    console.log('Logging out');
    vm.userId = "";
    vm.lastLogin = "";
    vm.auth = false;
    sessionStorage.setItem("userId", null);
    sessionStorage.setItem("last_access_t", null);
    window.location.hash = '#/login'
  }

}]);