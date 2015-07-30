(function(env){
  var eventsMap = {};
  var idSeed = 1;
  var prefix = "qq-"
  function View(config){
    function Child(){
      bindEvent(this);      
    };
    Child.prototype = config;
    return Child;
  }

  function bindEvent(view){

    for( var eventName in view.events ){
      var viewEl = document.querySelectorAll(view.el)[0];
      if(!viewEl.id){
        viewEl.id = prefix + (idSeed++);
      }
      if(eventsMap[viewEl.id] && eventsMap[viewEl.id][eventName]){
        return;
      }
      eventsMap[viewEl.id] = eventsMap[viewEl.id] || {};
      eventsMap[viewEl.id][eventName] = true;
      (function(en){

        viewEl.addEventListener(en, function(e){
            for( var key in view.events[en]){ // en is "eventName i,e click " key is:  "selector" : "listener",
              
              if(Library.getSpecificTarget(e.target, key, 3)){
                view[view.events[en][key]].call(view,e);
              }
            }
        }, false);

      })(eventName);

    }
  }

  function getSpecificTarget(eventTarget, selector, level){
    level = level || 5;
    for (var i = 0, node = eventTarget; i < level; i++){
        if(node.classList.contains(selector.split(".")[1])){
          return node;
        } else {
          node = node.parentNode;
        }
    }
    return false;
  }

  function removeCls(el, cls){
    var elCls = el.getAttribute("class"),
    clsArr = elCls.trim().split(" ");
    if(clsArr.indexOf(cls) > 1){
      clsArr.splice(clsArr.indexOf(cls),1);
    }
    el.setAttribute("class", clsArr.join(" "));
  }

  function addCls(el, cls){
    var elCls = el.getAttribute("class"),
    clsArr = elCls.trim().split(" ");
    if(clsArr.indexOf(cls) === -1){
      el.setAttribute("class", elCls.concat(" " + cls));
    }
  }

  Library = {
    getSpecificTarget: getSpecificTarget,
    removeCls: removeCls,
    addCls: addCls
  };

  env.Library = QQ = Library;
  env.Library.View = View;

})(window);

