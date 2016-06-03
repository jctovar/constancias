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
                $location.path('login');
            case 'signin':
                $location.path('login');
       }
    };
  
  $scope.login = function (index) {
      $location.path('login');
  }
})

.controller('LoginCtrl', function ($scope, $route, $location, auth) {
    $scope.login = function () {
        auth.login($scope.user_email, $scope.user_password);
    }
})

.controller('DashboardCtrl', function ($scope) {

})

.controller('NavCtrl', function ($scope, $location, $mdSidenav) {
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
})

.controller('BackCtrl', function ($scope, $location, $window) {
    $scope.back = function () {
        $window.history.back();
    }
})

.controller('SideCtrl', function ($scope, $location, navigation, auth) {
    $scope.go = function (route) {
        console.log(route);
        $location.path(route);
    }
    
    $scope.admin = [{link : 'my', title: 'Mi perfil', icon: 'face'},{link : 'password', title: 'Cambiar contraseña', icon: 'lock'},{link : 'account', title: 'Cuenta', icon: 'settings'}];
    
    $scope.logout = function () {
          auth.logout();
    }; 
    
    var query = navigation.get(function() {
        $scope.menu = query.navigation;    
    });
    
    $scope.user_name = sessionStorage.name;
    $scope.user_email = sessionStorage.email;
})