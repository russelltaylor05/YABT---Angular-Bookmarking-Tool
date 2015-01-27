'use strict';

// Declare app level module which depends on views, and components
angular.module('linkyApp', [
  'ngRoute',
  'ngStorage',
  'ui.bootstrap',
  'collectionController',
  'linkController',
  'linkyService',
])

.config(['$routeProvider', function($routeProvider) {

  $routeProvider. 
    when('/list/:listId', {
      templateUrl: 'view.html',
      controller: 'myLists',
      resolve: {
        validation: function ($q, $route, linkService) {
          var deferred = $q.defer(), foundId = false;
          var routeId = parseInt($route.current.params.listId, 10);

          for(var key in linkService.lists) {
            if(routeId == linkService.lists[key].id) {
              foundId = true;
            }
          }                    
          if (foundId) {
            deferred.resolve();
          } else {
            deferred.reject('VALIDATION FAILED');
          }
          return deferred.promise;
        }
      }      
    }).
    otherwise({
      templateUrl: 'view.html',      
      controller: 'myLists',      
      redirectTo: '/'
    });
}]);