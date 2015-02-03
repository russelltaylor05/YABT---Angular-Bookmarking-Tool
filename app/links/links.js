'use strict';

angular.module ('linkController', [])

.controller('myLinks', ['$scope', '$routeParams', '$location', 'linkService', 
function ($scope, $routeParams, $location, linkService) {

  var newLink = "";
  var currentListId = $scope.currentListId = $routeParams.listId; 
  
  $scope.listLinks = linkService.getLinks(currentListId);  
  $scope.orderProp = 'date';

  
  $scope.addLink = function() {    

    newLink = {
      title: $scope.formData.newLink,
      created: new Date()
    }
    if(newLink.title.length == 0) return;
    for(var key in $scope.listLinks) {
      if($scope.listLinks[key].title == newLink.title) return;
    }    

    linkService.addLink(newLink, currentListId);
    $scope.formData.newLink = "";
  }; 
  
  $scope.removeLink = function(link) {    
    linkService.removeLink(link, currentListId);
  };
  
}]);
