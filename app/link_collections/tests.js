'use strict';

//dump($scope.lists);

describe('LinkCollection Controller Tests', function () {

  var $scope, $location, createController, $routeParams, linkService;

  beforeEach(module('ngStorage'));
  beforeEach(module('ngRoute'));
  beforeEach(module('linkyService'));

  beforeEach(module('collectionController'));


  beforeEach(inject(function ($rootScope, _$routeParams_, _$location_,  _linkService_) {
    $scope = $rootScope.$new();
    $location = _$location_;
    $routeParams = _$routeParams_;
    linkService = _linkService_;
  }));
  
  
  it('should add a new list', inject(function($controller) {
    $controller('myCollections', {
      $scope: $scope,
      $routeParams: {listId: 1}
    });        
    $scope.addList("Hello");
    
    expect($scope.listIsActive(1)).toEqual(true);    
    expect($scope.atLeastOneList()).toEqual(true);    
    
    
    expect($scope.lists.length).toEqual(1);
    expect($scope.lists[0].title).toEqual("Hello");        
  })); 


  it('should delete a list', inject(function($controller) {
    $controller('myCollections', {
      $scope: $scope,
      $routeParams: {listId: 1}
    });        
    $scope.addList("Hello");
    expect($scope.lists.length).toEqual(1);

    $scope.removeList(1);
    expect($scope.lists.length).toEqual(0);     
    

  })); 

});