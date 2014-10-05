'use strict';

angular.module('myApp.myroutes', [
  'ngRoute',
  'ngLocale'
  
  ])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      //
    //$httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //
    $routeProvider.
      when('/', {
        templateUrl: 'views/dashboard.html', 
        controller: 'DemoCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/images', {
        templateUrl: 'views/images.html',
        controller: 'ImageCtrl'
      })
      .when('/containers', {
        templateUrl: 'views/containers.html',
        controller: 'ContainerCtrl'
      })
      .when('/servers', {
        templateUrl: 'views/servers.html',
        controller: 'ServerCtrl'
      })
      .when('/maps', {
        templateUrl: 'views/maps.html',
        controller: 'MapsCtrl'
      })
      .when('/forms', {
        templateUrl: 'partials/forms.html'
      })
      .when('/charts', {
        templateUrl: 'partials/charts.html',
        controller: 'DemoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    /*$routeProvider.
      when('/', {
        templateUrl: 'partials/index.html',
        controller: 'DemoCtrl'
      })
      .when('/charts', {
        templateUrl: 'partials/charts.html',
        controller: 'DemoCtrl'
      })
      .when('/tables', {
        templateUrl: 'partials/tables.html'
      })
      .when('/forms', {
        templateUrl: 'partials/forms.html'
      })
      .when('/typography', {
        templateUrl: 'partials/typography.html'
      })
      .when('/bootstrap-elements', {
        templateUrl: 'partials/bootstrap-elements.html'
      })
      .when('/bootstrap-grid', {
        templateUrl: 'partials/bootstrap-grid.html'
      })
      .when('/blank-page', {
        templateUrl: 'partials/blank-page.html'
      })
      .otherwise({
        redirectTo: '/'
      });
    */
    
  }]);