'use strict';


angular.module ('collectionController', [])

.controller('myCollections', ['$scope', '$routeParams', '$location', 'linkService', 
function ($scope, $routeParams, $location, linkService) {
  
  var newList = "";
  var currentListId = $scope.currentListId = $routeParams.listId;   
  var lists = $scope.lists = linkService.lists;
  
  $scope.addList = function(title) {
    //var newId = linkService.addList({title: $scope.formData.newList});
    var newId = linkService.addList({title: title});    
    if(newId > 0) {
      $location.path("/list/" + newId);  
    } else {
      // add error
    }        
  };

  $scope.removeList = function(listId) {
    linkService.removeList(listId);
    $scope.currentListId = currentListId = false;
    $location.path("/");
  };      

  $scope.listTitle = function(){
    if(currentListId) {
      return  linkService.getList(currentListId).title;  
    } else {return false;}
  }
  $scope.listDescription= function(){
    if(currentListId) {
      return  linkService.getList(currentListId).description;
    }
  }
  
  $scope.listIsActive = function(checkId) {
    return checkId == currentListId; 
  }
  
  $scope.atLeastOneList = function() {
    return linkService.lists.length >= 1;
  }

  $scope.reset = function() {
    linkService.resetLists(); 
  };
   
}])


.controller('editListModalCtrl', function ($scope, $modal, $log) {
  
  $scope.open = function (size) {    

    var modalInstance = $modal.open({
      templateUrl: 'editCollectionContent.html',
      controller: function($scope, $modalInstance, $location, $routeParams, linkService) {
        var currentListId = $scope.currentListId = $routeParams.listId;   
        $scope.formData = {}
        $scope.formData.listName = linkService.getList(currentListId).title;
        $scope.formData.listDesc = linkService.getList(currentListId).description;
        
        $scope.submit = function() {
          linkService.updateList({id: currentListId, title: $scope.formData.listName, description: $scope.formData.listDesc});
          $modalInstance.close();          
        }
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
        
      },
      backdrop: true,
      size: size,
    });
  };
})


.controller('listModalCtrl', function ($scope, $modal, $log) {
  
  $scope.open = function (size) {    

    var modalInstance = $modal.open({
      templateUrl: 'newCollectionContent.html',
      controller: function($scope, $modalInstance, $location, linkService) {
        $scope.submit = function() {
          var newId = linkService.addList({title: $scope.formData.listName, description: $scope.formData.listDesc});
          if(newId > 0) {
            $modalInstance.close();
            $location.path("/list/" + newId);  
          } else {
            //add error
          }
        }
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
        
      },
      backdrop: true,
      size: size,
    });
  };
});


