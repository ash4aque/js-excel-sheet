var ListView =  Library.View({
    
    el: ".listView",

    /*events: {
      "click .js-add-card" : "addNewCard",
      "click .js-edit-card" : "editCard",
      "click .js-card-menu" : "showCardMenu",
      "ondrop .lists-view" : "dropHandler",
      "ondragover .lists-view" : "dragOverEvent",
      "ondragstart .lists-view" : "dragStartHandler"
    },*/

    events: {
      "click" : {
        ".js-add-card" : "addNewCard"
      }
    },
 
    render : function(args){
      var tpl = document.querySelectorAll("#listTpl")[0];
      var itemContainer = document.querySelectorAll(this.el)[0];
      tpl.querySelectorAll(".js-list-header")[0].innerHTML =  args.name;
      itemContainer.innerHTML += tpl.innerHTML;
    },
    addNewCard: function(e){
      var tpl = document.querySelectorAll("#cardTpl")[0];
      var carContainer = e.target.parentNode.querySelectorAll(".js-card-container")[0];
      carContainer.innerHTML += tpl.innerHTML;
    }
});
