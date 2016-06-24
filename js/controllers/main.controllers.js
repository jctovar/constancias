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

.controller('MenuCtrl', function ($scope) {
    $scope.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
}) 

.controller('LoginCtrl', function ($scope, $http, $base64, $mdToast, $location, login) {
    $scope.login = function () {
        
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

.controller('DashboardCtrl', function ($scope, $location, $mdDialog, $mdToast, dates) {
    $scope.$on('$viewContentLoaded', function ($evt, data) {
        inito();
    });

    $scope.show = function (index) {
      $location.path('/group/'+ index);
    }

    var inito = function () {
            $scope.bar = false;
            dates.get()
            .$promise.then(function (result) {
                $scope.items = result.dates;
                $scope.bar = !$scope.bar;
            })
            .catch(function(error) {
                $location.path('/login')
            });
    };
})

.controller('NavCtrl', function ($scope, $location, $mdSidenav, auth) {
    $scope.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };
    
    $scope.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
    
    $scope.logout = function () {
          auth.logout();
    }; 
    
    $scope.go = function (value) {
        $location.path(value);
    }    
    
    $scope.account_name = sessionStorage.account_name;
    $scope.profile_name = sessionStorage.profile_name;
})

.controller('BackCtrl', function ($scope, $location, $window) {
    $scope.back = function () {
        $window.history.back();
    }
    
    $scope.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
    
    $scope.logout = function () {
          auth.logout();
    };
    
    $scope.go = function (value) {
        $location.path(value);
    }  
    
    $scope.account_name = sessionStorage.account_name;
    $scope.profile_name = sessionStorage.profile_name;
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

// get all students  
.controller('StudentsCtrl', function ($scope, $location, $mdDialog, $mdToast, students) {
  $scope.title = 'Catalogo de alumnos';
  
  $scope.$on('$viewContentLoaded', function ($evt, data) {
      inito();
  });
 
  $scope.clear = function () {
      console.log($scope.searchQuery);
      $scope.searchQuery = '';
  }
  
  $scope.add = function () {
      $location.path('/student')
  }
  
  $scope.edit = function (index) {
      $location.path('/student/'+ index);
  }
  
  $scope.delete = function(index, ev) {
        var confirm = $mdDialog.confirm()
            .title('Esta seguro de eliminar este registro?')
            .textContent('El registro sera eliminado permanentemente.')
            .ok('Si')
            .cancel('No');
            $mdDialog.show(confirm).then(function() {
                    del(index);
                }, function() {
                console.log('You decided to keep your record.')
            });
  };
  
  var del = function (id) {
        students.delete({ id: id })
        .$promise.then(function (result) {
            inito();
            $mdToast.show($mdToast.simple().textContent('Registro eliminado!'));
        })
        .catch(function(error) {
             $mdToast.show($mdToast.simple().textContent('Ocurrio un error!'));
        });    
  }
  
  var inito = function () {
        $scope.bar = false;
        students.get()
        .$promise.then(function (result) {
            $scope.items = result.students;
            $scope.bar = !$scope.bar;
        })
        .catch(function(error) {
             $location.path('/login')
        });
   };
})

.controller('AddStudentCtrl', function ($scope, $location, $routeParams, $mdToast, students, origins) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              var result = students.save($scope.item, function() {
                  if (result.students.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('students')
                  };
              });            
          } else {
              $location.path('students')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    };

    var query1 = origins.get(function() {
        $scope.list1 = query1.origins;    
    });
})

.controller('EditStudentCtrl', function ($scope, $location, $routeParams, $mdToast, students, origins) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              var result = students.update($scope.item, function() {
                  if (result.students.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('students')
                  };
              });            
          } else {
              $location.path('students')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    };

    var query1 = origins.get(function() {
        $scope.list1 = query1.origins;    
    });
    
    var query = students.get({ id: $routeParams.studentId },function() {
        $scope.item = query.students[0];    
    });
})

.controller('EventsCtrl', function ($scope, $location, $mdDialog, $mdToast, events) {
  $scope.title = 'Catalogo de eventos';
  
  $scope.$on('$viewContentLoaded', function ($evt, data) {
      inito();
  });
 
  $scope.clear = function () {
      console.log($scope.searchQuery);
      $scope.searchQuery = '';
  }
  
  $scope.dates = function (index) {
      $location.path('dates/'+ index)
  }

  $scope.add = function () {
      $location.path('event')
  }
  
  $scope.edit = function (index) {
      $location.path('event/'+ index);
  }
  
  $scope.delete = function(index, ev) {
        var confirm = $mdDialog.confirm()
            .title('Esta seguro de eliminar este registro?')
            .textContent('El registro sera eliminado permanentemente.')
            .ok('Si')
            .cancel('No');
            $mdDialog.show(confirm).then(function() {
                    del(index);
                }, function() {
                console.log('You decided to keep your record.')
            });
  };
  
  var del = function (id) {
        events.delete({ id: id })
        .$promise.then(function (result) {
            inito();
            $mdToast.show($mdToast.simple().textContent('Registro eliminado!'));
        })
        .catch(function(error) {
             $mdToast.show($mdToast.simple().textContent('Ocurrio un error!'));
        });    
  }
  
  var inito = function () {
        $scope.bar = false;
        events.get()
        .$promise.then(function (result) {
            $scope.items = result.events;
            $scope.bar = !$scope.bar;
        })
        .catch(function(error) {
             $location.path('/login')
        });
   };
})

.controller('AddEventCtrl', function ($scope, $location, $routeParams, $mdToast, events, categories) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              var result = events.save($scope.item, function() {
                  if (result.events.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('events')
                  };
              });            
          } else {
              $location.path('events')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    };

    var query1 = categories.get(function() {
        $scope.list1 = query1.categories;    
    });
})

.controller('EditEventCtrl', function ($scope, $location, $routeParams, $mdToast, events, categories) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              var result = events.update($scope.item, function() {
                  if (result.events.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('events')
                  };
              });            
          } else {
              $location.path('events')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    };

    var query1 = categories.get(function() {
        $scope.list1 = query1.categories;    
    });
    
    var query = events.get({ id: $routeParams.eventId },function() {
        $scope.item = query.events[0];    
    });
})

.controller('UsersCtrl', function ($scope, $location, $mdDialog, $mdToast, accounts) {
  $scope.title = 'Catalogo de usuarios';
  
  $scope.$on('$viewContentLoaded', function ($evt, data) {
      inito();
  });
 
  $scope.clear = function () {
      console.log($scope.searchQuery);
      $scope.searchQuery = '';
  }
  
  $scope.add = function () {
      $location.path('user')
  }
  
  $scope.edit = function (index) {
      $location.path('user/'+ index);
  }
  
  $scope.delete = function(index, ev) {
        var confirm = $mdDialog.confirm()
            .title('Esta seguro de eliminar este registro?')
            .textContent('El registro sera eliminado permanentemente.')
            .ok('Si')
            .cancel('No');
            $mdDialog.show(confirm).then(function() {
                    del(index);
                }, function() {
                console.log('You decided to keep your record.')
            });
  };
  
  var del = function (id) {
        accounts.delete({ id: id })
        .$promise.then(function (result) {
            inito();
            $mdToast.show($mdToast.simple().textContent('Registro eliminado!'));
        })
        .catch(function(error) {
             $mdToast.show($mdToast.simple().textContent('Ocurrio un error!'));
        });    
  }
  
  var inito = function () {
        $scope.bar = false;
        accounts.get()
        .$promise.then(function (result) {
            $scope.items = result.accounts;
            $scope.bar = !$scope.bar;
        })
        .catch(function(error) {
             $location.path('/login')
        });
   };
})

.controller('AddUserCtrl', function ($scope, $location, $routeParams, $mdToast, accounts, roles) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              var result = events.save($scope.item, function() {
                  if (result.events.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('events')
                  };
              });            
          } else {
              $location.path('events')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    };

    var query1 = roles.get(function() {
        $scope.list1 = query1.roles;    
    });
})

.controller('EditUserCtrl', function ($scope, $location, $routeParams, $mdToast, accounts, roles) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              var result = accounts.update($scope.item, function() {
                  if (result.accounts.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('users')
                  };
              });            
          } else {
              $location.path('users')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    };

    var query1 = roles.get(function() {
        $scope.list1 = query1.roles;    
    });
    
    var query = accounts.get({ id: $routeParams.accountId },function() {
        $scope.item = query.accounts[0];    
    });
})

.controller('DatesCtrl', function ($scope, $location, $routeParams, $mdDialog, $mdToast, dates) {
  $scope.title = 'Fechas del eventos';
  
  $scope.$on('$viewContentLoaded', function ($evt, data) {
      inito();
  });
 
  $scope.clear = function () {
      console.log($scope.searchQuery);
      $scope.searchQuery = '';
  }
  
  $scope.dates = function () {
      $location.path('dates/'+ index)
  }

  $scope.add = function () {
      $location.path('event')
  }
  
  $scope.edit = function (index) {
      $location.path('event/'+ index);
  }
  
  $scope.delete = function(index, ev) {
        var confirm = $mdDialog.confirm()
            .title('Esta seguro de eliminar este registro?')
            .textContent('El registro sera eliminado permanentemente.')
            .ok('Si')
            .cancel('No');
            $mdDialog.show(confirm).then(function() {
                    del(index);
                }, function() {
                console.log('You decided to keep your record.')
            });
  };
  
  var del = function (id) {
        events.delete({ id: id })
        .$promise.then(function (result) {
            inito();
            $mdToast.show($mdToast.simple().textContent('Registro eliminado!'));
        })
        .catch(function(error) {
             $mdToast.show($mdToast.simple().textContent('Ocurrio un error!'));
        });    
  }
  
  var inito = function () {
        $scope.bar = false;
        dates.get({ id: $routeParams.dateId })
        .$promise.then(function (result) {
            $scope.items = result.dates;
            $scope.bar = !$scope.bar;
        })
        .catch(function(error) {
             $location.path('/login')
        });
   };
})

.controller('GroupCtrl', function ($scope, $location, $routeParams, $mdDialog, $mdToast, groups) {
  $scope.title = 'Alumnos inscritos';
  
  $scope.$on('$viewContentLoaded', function ($evt, data) {
      inito();
  });
 
  $scope.clear = function () {
      console.log($scope.searchQuery);
      $scope.searchQuery = '';
  }
  
  $scope.add = function () {
      $location.path('/student')
  }
  
  $scope.edit = function (index) {
      $location.path('/student/'+ index);
  }
  
  $scope.delete = function(index, ev) {
        var confirm = $mdDialog.confirm()
            .title('Esta seguro de eliminar este registro?')
            .textContent('El registro sera eliminado permanentemente.')
            .ok('Si')
            .cancel('No');
            $mdDialog.show(confirm).then(function() {
                    del(index);
                }, function() {
                console.log('You decided to keep your record.')
            });
  };
  
  var del = function (id) {
        students.delete({ id: id })
        .$promise.then(function (result) {
            inito();
            $mdToast.show($mdToast.simple().textContent('Registro eliminado!'));
        })
        .catch(function(error) {
             $mdToast.show($mdToast.simple().textContent('Ocurrio un error!'));
        });    
  }
  
  var inito = function () {
        $scope.bar = false;
        groups.get({ id: $routeParams.dateId })
        .$promise.then(function (result) {
            $scope.items = result.groups;
            $scope.bar = !$scope.bar;
        })
        .catch(function(error) {
             $location.path('/login')
        });
   };
})