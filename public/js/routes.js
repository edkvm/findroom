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
        templateUrl: 'views/maps.html',
        controller: 'MapsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    
  }]);