'use strict';

angular.module ('collectionController', [])

.controller('myLists', ['$scope', '$routeParams', '$location', 'linkService', 
function ($scope, $routeParams, $location, linkService) {
  
  var newList = "";
  var currentListId = $scope.currentListId = $routeParams.listId;   
  var lists = $scope.lists = linkService.lists;
  
  $scope.addList = function() {
    newList = {
      title: $scope.formData.newList,
      description: "This is a description of your list",
      created: new Date()
    }
    if(newList.title.length == 0) return;
    for(var key in $scope.lists) { 
      if($scope.lists[key].title == newList.title) return;
    }    
    var newId = linkService.addList(newList);
    $scope.newList = "";
    
    $location.path("/list/" + newId);
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



.controller('listModalInst', [ '$scope', '$modalInstance', '$location', 'linkService',
function ($scope, $modalInstance, $location, linkService) {
  
  var newList = {};  

  $scope.submit = function() {
    var description = ($scope.formData.listDesc) ? $scope.formData.listDesc : "This is a description of your collection";
    newList = {
      title: $scope.formData.listName,
      description: description,
      created: new Date()
    }
    
    if(newList.title.length == 0) return;
    for(var key in $scope.lists) { 
      if($scope.lists[key].title == newList.title) return;
    }    
    var newId = linkService.addList(newList);
    $scope.newList = "";

    $modalInstance.close();
    $location.path("/list/" + newId);
    
  }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}])

.controller('listModalCtrl', function ($scope, $modal, $log) {
  
  $scope.open = function (size) {    

    var modalInstance = $modal.open({
      templateUrl: 'newCollectionContent.html',
      controller: 'listModalInst',
      backdrop: true,
      size: size,
      resolve: {
        items: function () {
          return $scope.formNewList;
        }
      }
    });

  };
});


