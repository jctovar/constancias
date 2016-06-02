angular.module('starter', ['ngRoute', 'ngResource', 'ngSanitize', 'ngAnimate', 'ngMessages', 'ngMaterial', 'ngAnimate', 'ngAria', 'ui.gravatar', 'main.controllers'])

.config(function($mdIconProvider, $mdThemingProvider) {
      // Configure URLs for icons specified by [set:]id.
      $mdIconProvider
          .icon('add', 'img/icons/ic_add_black_24px.svg')
          .icon('more_vert', 'img/icons/ic_more_vert_black_24px.svg')    // Register a specific icon (by name)
          .icon('check', 'img/icons/ic_done_black_24px.svg')
          .icon('arrow_back', 'img/icons/ic_arrow_back_black_24px.svg')
          .icon('search', 'img/icons/ic_search_black_24px.svg')
          .icon('edit', 'img/icons/ic_mode_edit_black_24px.svg')
          .icon('delete', 'img/icons/ic_delete_forever_black_24px.svg')
          .icon('clear', 'img/icons/ic_clear_black_24px.svg')
          .icon('menu', 'img/icons/ic_menu_black_24px.svg')
          .icon('users', 'img/icons/ic_supervisor_account_black_24px.svg')
          .icon('group', 'img/icons/ic_group_black_24px.svg')
          .icon('face', 'img/icons/ic_face_black_24px.svg')
          .icon('note', 'img/icons/ic_note_black_24px.svg')
          .icon('dashboard', 'img/icons/ic_dashboard_black_24px.svg')
          .icon('settings', 'img/icons/ic_settings_black_24px.svg')
          .icon('person', 'img/icons/ic_person_black_24px.svg')
          .icon('agenda', 'img/icons/ic_view_agenda_black_24px.svg')
          .icon('off', 'img/icons/ic_highlight_off_black_24px.svg')
          .icon('lock', 'img/icons/ic_lock_black_24px.svg')
})

.run(function ($rootScope, $location) {
      //al cambiar de rutas
      $rootScope.$on('$routeChangeStart', function()
      {
          //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
          //la cuál hemos inyectado en la acción run de la aplicación
          //auth.checkStatus();
      })
      
      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
          $rootScope.title = current.$$route.title;
      })
})

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $routeProvider
        // Alumnos
        .when('/students', {
          title: 'Alumnos',
          templateUrl: 'templates/students.html',
          controller: 'StudentsCtrl'
        })
        .when('/student', {
          title: 'Agregar alumno',
          templateUrl: 'templates/student.html',
          controller: 'AddStudentCtrl'
        })
        .when('/student/:studentId', {
          title: 'Editar alumno',
          templateUrl: 'templates/student.html',
          controller: 'EditStudentCtrl',
        })
        // Cursos
        .when('/events', {
          title: 'Eventos',
          templateUrl: 'templates/events.html',
          controller: 'EventsCtrl'
        })
        .when('/events', {
          title: 'Agregar evento',
          templateUrl: 'templates/event.html',
          controller: 'AddEventCtrl'
        })
        .when('/events/:eventId', {
          title: 'Editar evento',
          templateUrl: 'templates/event.html',
          controller: 'EditEventCtrl',
        })
        
        .when('/dashboard', {
          templateUrl: 'templates/app/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .when('/my', {
          title: 'Datos personales',
          templateUrl: 'templates/user.html',
          controller: 'ProfileCtrl'
        })
        .when('/password', {
          templateUrl: 'templates/password.html',
          controller: 'PasswordCtrl'
        })
        .when('/account', {
          templateUrl: 'templates/account.html',
          controller: 'AccountCtrl'
        })
        .when('/', {
          title: 'Inicio',
          templateUrl: 'templates/main/main.html',
          controller: 'MainCtrl'
        })
        .when('/login', {
          title: 'Autentificación',
          templateUrl: 'templates/main/login.html',
          controller: 'LoginCtrl'
        })
        .when('/about', {
          title: 'Acerca del sitio',
          templateUrl: 'templates/main/about.html'
        })
        .when('/credits', {
          title: 'Creditos',
          templateUrl: 'templates/main/credits.html'
        })
        .when('/contact', {
          title: 'Contacto',
          templateUrl: 'templates/main/contact.html'
        })
        .otherwise({
          redirectTo: '/',
          templateUrl: 'templates/main/main.html',
          controller: 'MainCtrl'
        });
}])