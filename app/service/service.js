'use strict';

angular.module ('linkyService', [
  'ngStorage',
])

.factory('linkService', ['$localStorage', function ($localStorage) {
  
  if(!$localStorage.lists) {
    $localStorage.lists = [];
  }
  

  var data = {
    
    lists : $localStorage.lists,
      
    getList: function(listId) {
      for(var key in data.lists) {
        if(data.lists[key].id == listId) {
          return data.lists[key];
        }
      }  
    },

    addList: function(list) {
      var newId = 0;
      
      var newList = {
        title: list.title,
        description: (list.description) ? list.description : "This is a description of a Collection.",
        created: new Date(),
        links : []
      }
      if(newList.title.length == 0) return -1;
            
      for(var key in data.lists) {
        if(data.lists[key].id > newId) {
          newId = data.lists[key].id;
        }
      }
      
      newId++;
      newList.id = newId;
      
      data.lists.push(newList);      
      return newId;
    },
    
    updateList : function(list) {
      for(var key in data.lists) {
        if(data.lists[key].id == list.id) {
          data.lists[key].title = list.title;
          data.lists[key].description = list.description;
        }
      }
    },
    
    removeList : function(listId) {
      for(var key in data.lists) {
        if(data.lists[key].id == listId) {
          data.lists.splice(key,1);
        }
      }      
    },
    
    resetLists : function() {
      $localStorage.lists = [];
    },
    
    
    getLinks : function (listId) {
      for(var key in data.lists) {
        if(data.lists[key].id == listId) {
          return data.lists[key].links;
        }
      }            
    },
    
    addLink : function(link, listId) {
      for(var key in data.lists) {
        if(data.lists[key].id == listId) {
          data.lists[key].links.push(link);
        }
      }
    },
    
    removeLink : function(link, listId) {
      for(var key in data.lists) {
        if(data.lists[key].id == listId) {
          var links = data.lists[key].links;
          for(var key2 in links) {
            if(links[key2].title == link.title) {
              links.splice(key2, 1);
            }
          }
        }
      }
    },
      
 
  }
  return data;
  

  
}]);
  
