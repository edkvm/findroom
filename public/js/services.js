'use strict';


angular.module('myApp.services', [])
  .value('version', '0.1')
  .factory('AuthService', ['$http', 'Session', function ($http, Session) {
  	return {

  		login: function (credentials) {
  			var authReq = { 
          user: { 
            userId: 1,
            username:credentials.username,
            password:credentials.password
          }
        };
        
        return $http({
  					method: 'POST',
            url: '/api/login',
  					data: authReq
  			 	  
  			 	})
  				.then( function (res){
            console.log(res.data.user);
            Session.create(res.data.user.id, res.data.user.userId,
                res.data.user.userRole);
  				});
  		},

  		isAuthenticated: function (){
  			return !!Session.userId;
  		},

  		isAuthorized: function(authorizedRoles) {
  			if(!angular.isArray(authorizedRoles)) {
  				authorizedRoles = [authorizedRoles];
  			}
  			return (this.isAuthenticated() && authorozedRoles.indexOf(Session.userRole) != -1);
  		}
	 };
  }])
  .service('API', ['$http', function($http) {

    return { init : function () {
                      $http({
                      method: 'GET',
                        url: '/api/list' 
                    
                    }).then( function (res){
                        
                        $scope.serverList = res.data;
                        //console.log($scope.serveList);
                    });
                  }
    }  
  }])
  .service('ImageService',['$http', function($http){
      
  }])
  .service('Session', function (){
  	
  	this.create = function (sessionId, userId, userRole){
  		if(userId) {
        this.Id = sessionId;
  		  this.userId = userId;
  		  this.userRole = userRole;
        console.log("[INFO] Session created");
      } else{
        console.log("[WARN] An error has occured when creating a session");
      }

      
  	};
	
  	this.destroy = function () {
  	    this.id = null;
  	    this.userId = null;
  	    this.userRole = null;
  	};
  	
  	return this;
  });
