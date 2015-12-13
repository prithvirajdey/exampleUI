'use strict';

angular.module('myApp.login', ['ngRoute', 'ngCookies'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl'
    });
  }])

  .controller('LoginCtrl', ['$cookies', '$timeout', '$document', '$http', function ($cookies, $timeout, $document, $http) {

    var vm = this;
    vm.userId = "";
    vm.password = "";
    vm.message = "";

    vm.loginUser = function () {
      vm.message = "";
      // Validations
      if (vm.userId == "" || vm.password == "") {
        vm.message = "User ID / Password cannot be empty or blank";
        return;
      }
      // Set data and call REST service
      var userData = {};
      // $cookies.remove("userId");
      // $cookies.remove("last_access_t");
      sessionStorage.setItem("userId", null);
      sessionStorage.setItem("last_access_t", null);
      userData.userId = vm.userId;
      userData.password = vm.password;
      return $http.post(`http://localhost:8080/LoginServices/rest/services/auth`, userData)
        .then(function (response) {
          // console.log(response);
          if (response.data.error == null) {
            if (response.data.message == "User Authenticated") {
              // Setting authenticated user in storage
              sessionStorage.setItem("userId", vm.userId);
              // $cookies.put("userId", vm.userId);
              
              // Timeout for cookies refresh
              $timeout(function () {
                // In case cookie is not detected in angular
                if ($cookies.get("last_access_t") == null || $cookies.get("last_access_t") == undefined) {
                  // $cookies.put("last_access_t", response.data.lastLogin);
                  sessionStorage.setItem("last_access_t", response.data.lastLogin);
                } else {
                  sessionStorage.setItem("last_access_t", $cookies.get("last_access_t"));
                }
                window.location.hash = '#/welcome';
              }, 100);

            } else {
              vm.message = response.data.message;
            }
          } else {
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