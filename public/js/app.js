'use strict';


// Declare app level module which depends on filters, and services
angular.module('FindRoomApp', [
  'ngRoute',
  'ngLocale',
  'myApp.myroutes',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'	
})
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
})
.run(['$rootScope', '$location', 'AUTH_EVENTS', 'USER_ROLES' , 'AuthService', 
	function ($rootScope, $location, AUTH_EVENTS, USER_ROLES, AuthService) {
	  $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, next){
        console.log("[INFO] Redirecting to dashboard");
        $location.path( "/" );

    });

    $rootScope.$on('$locationChangeStart', function (event, next) {
	    console.log("[INFO] location change");
      var authorizedRoles = [USER_ROLES.admin, USER_ROLES.editor];
	    if (!AuthService.isAuthorized(authorizedRoles)) {
	      //event.preventDefault();
	      if (AuthService.isAuthenticated()) {
	        // user is not allowed
	        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
	      } else {
          //console.log("[INFO] Not Logged, redirecting");
          //$location.path( "/login" );
	        // user is not logged in
	        //$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
	    }
	  });
}]);
