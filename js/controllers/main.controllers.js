angular.module('main.controllers', ['main.auth', 'main.models', 'main.directives'])

.controller('MainCtrl', function ($scope, $location) {
  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
  
  $scope.go = function (value) {
       console.log(value);
       switch(value) {
            case 'login':
                $location.path('/login');
            case 'signin':
                $location.path('/login');
       }
    };
  
  $scope.login = function (index) {
      $location.path('/login');
  }
})

.controller('LoginCtrl', function ($scope, $route, $location, auth) { 
    $scope.login = function () {
        auth.login($scope.user_email, $scope.user_password);
    }
});