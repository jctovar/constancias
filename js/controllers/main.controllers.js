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

.controller('LoginCtrl', function ($scope, $http, $base64, $mdToast, $location, login) {
    $scope.login = function () {
        $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode($scope.account_email + ':' + $scope.account_password);
        console.log($base64.encode($scope.account_email + ':' + $scope.account_password));
        
        login.get({ account_email: $scope.account_email, account_password: $scope.account_password })
        .$promise.then(function (result) {
            $location.path('dashboard')
        })
        .catch(function(error) {
            console.log("rejected " + JSON.stringify(error.data.message));
            $mdToast.show($mdToast.simple().textContent('Ocurrio un error, verifique sus credenciales!'));
        });
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