describe('linky service factory tests for Lists', function () {
   var linkService;
   beforeEach(module('ngStorage'));
   beforeEach(module('linkyService'));

   beforeEach(inject(function (_linkService_) { 
     linkService = _linkService_;
   }));
   
   var newList = {
     id: 1,
     title: "Hello World",
     description: "Hi there",
     created: new Date(),
     links : []
   };
   
   it('should add a new list', function () {
     linkService.addList(newList);
     expect(linkService.lists.length).toEqual(1);
   });

   it('should update list', function () {
     linkService.addList(newList);
     newList.title = "Updated Title";
     linkService.updateList(newList);          
     expect(linkService.getList(1)).toEqual(newList);     
     expect(linkService.getList(1).title).toEqual("Updated Title");     
   });

   it('should delete list', function () {
     linkService.addList(newList);
     linkService.removeList(2);
     expect(linkService.lists.length).toEqual(1);
     linkService.removeList(newList.id);
     expect(linkService.lists.length).toEqual(0);     
   });
});


describe('linky service factory tests for Links', function () {
   var linkService;
   var newList = {
     id: 1,
     title: "Hello World",
     created: new Date(),
     links : []
   };   
   var newLink = {
     title: "New Link",
     date : new Date()     
   }
   var anotherLink = {
     title: "Another Link",
     date : new Date()     
   }

   beforeEach(module('ngStorage'));
   beforeEach(module('linkyService'));

   beforeEach(inject(function (_linkService_) { 
     linkService = _linkService_;
     linkService.addList(newList);
   }));
   
   it("should add Link to List", function() {
     linkService.addLink(newLink, 1);     
     expect(linkService.lists.length).toEqual(1);
     expect(linkService.lists[0].links).toContain(newLink);     
   });

   it("should get all links from listID", function() {

     var linkList;
     linkService.addLink(newLink, 1);
     linkService.addLink(anotherLink, 1);     
     linkList = linkService.getLinks(1);
     expect(linkList.length).toEqual(2);
     expect(linkList).toContain(anotherLink);          
   });
   
   it("should remove a link based on listID", function() {
     linkService.lists[0].links[0]= newLink;
     linkService.lists[0].links[1]= anotherLink; 
     linkService.removeLink(anotherLink, 1);
     var linkList = linkService.lists[0].links;
     
     expect(linkList.length).toEqual(1);
     expect(linkList).not.toContain(anotherLink);          
     
     linkService.removeLink(newLink, 1);
     expect(linkList.length).toEqual(0);     
   });
  
});
