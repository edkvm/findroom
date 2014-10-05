'use strict';

/* Controllers */

angular.module('myApp.controllers', ['google-maps'])
  .controller('MapsCtrl', ['$scope', '$http', function($scope, $http){
    
    
    $scope.headerList = ['#', 'Price', 'Title', 'Link',];
        
    $scope.serverList=[];

    $scope.marker = {
            id:0,
            coords: {
                latitude: 40.1451,
                longitude: -99.6680
            },
            options: { draggable: true },
            events: {
                dragend: function (marker, eventName, args) {
                    $log.log('marker dragend');
                    $log.log(marker.getPosition().lat());
                    $log.log(marker.getPosition().lng());
                }
            }
    }

    $scope.markersEvents = {
          click: function (gMarker, eventName, model) {
            if(model.$id){
              model = model.coords;//use scope portion then
            }
           alert("Model: event:" + eventName + " " + JSON.stringify(model));
          }
        };

    var init = function () {
            return $http({
            method: 'GET',
              url: 'http://localhost:5000/api/apartments' 
          
          });
        };

    var createMarker = function (apartment, i) {
          
            
            var ret = {
              id: i,
              coords: {
                latitude: apartment.lat,
                longitude: apartment.lng,
              }, 
              options: { draggable: true }
            };

            
            return ret;
    };

    $scope.map = {
          center: {
          latitude: 40.744731,
          longitude:  -73.972566
          },
          zoom: 14
    };  
        

    var apr_response = init().then( function (res){
              
        $scope.apartments = res.data;

        
        // Get the bounds from the map once it's loaded
        $scope.$watch(function() { return $scope.map.bounds; }, function(nv, ov) {
         
        var markers = [];
        for (var i = 0; i < $scope.apartments.length; i++) {
          $scope.apartments[i]['selected'] = false
          if($scope.apartments[i].lat != "-1" && $scope.apartments[i].lng != "-1"){
            var m = createMarker($scope.apartments[i], i)
            console.log(m)
            markers.push(m)
          }
        }
        
        $scope.apartmentMarkers = markers;
        

      
    }, true);
          });;

    
    
  }]);
  
