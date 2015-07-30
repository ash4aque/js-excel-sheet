var excelSheetView =  Library.View({
    
    el: ".sheetView",
    row: 6,
    col: 6,
    cellDataMap: {},
    events: {
      "click" : {
        ".js-sheet-header" : "_sortColumn",
        ".js-del-row" : "_deleteRow",
        ".js-del-col" : "_deleteCol"
      },

      "onfocus" : {
        ".js-cell-data" : "_getCellData"
      },

      "onblur" : {
        ".js-cell-data" : "_setCellData"
      }

    },

    showAddListView: function (e){
      QQ.removeCls(document.querySelectorAll(".js-idle-button")[0], "idle");
    },

    hideAddListView: function(e){
      QQ.addCls(document.querySelectorAll(".js-idle-button")[0], "idle");
    },

    _createLayout: function () {
      var table = document.createElement("table");
      for (var i = 0; i < this.row; i++) {
          var row = document.createElement("tr");
          for (var j = 0; j < this.col; j++) {
              var headerSelector = "";
              var cellHeaderLabel = String.fromCharCode("A".charCodeAt(0)+j-1);
              if (i == 0) {
                headerSelector = "js-sheet-header";
              }
              var cell = document.createElement("td");
              cell.className = headerSelector;
              console.log(cellHeaderLabel)
              if (i == 0 && j == 0) {
                 cellHeaderLabel = "";
              }
              else if (i == 0 && j != 0) {
                 cell.innerHTML = cellHeaderLabel;
              }
              else if (j == 0 && i!=0) {
                cell.innerHTML = i;
              } else {
                cell.innerHTML = "<input class = 'js-cell-data' id='"+ cellHeaderLabel+i +"'/>";
              }
              row.appendChild(cell);  
          }
        table.appendChild(row);
      }
      document.querySelector(this.el).appendChild(table);
    },

    _getCellData : function (e) {
       e.target.value = this.cellDataMap[e.target.id] || "";
    },

    _setCellData : function (e) {
      this.cellDataMap[e.target.id] = e.target.value;
    },

    _sortColumn : function (e) {
        var headerLabel =  e.target.innerHTML.toUpperCase();
        var dataArray = [];
        var idArray =[];
        var ID_Data_Map = {};
        for (var i = 1; i<= this.row; i++) {
          candidateCellId =  "#"+headerLabel+i;
          var input = document.querySelector(candidateCellId);
          var cellData
          if(input) {
             cellData = input.value;
          }      
          ID_Data_Map["'"+candidateCellId+"'"] = cellData;
        }

     for (var key in ID_Data_Map){
         idArray.push(key);
         dataArray.push(ID_Data_Map[key]);
     }
     dataArray.sort(function(a, b){return a-b});
     alert(dataArray);

     var sortable = [];
     for (var data in ID_Data_Map){
       sortable.push([data, ID_Data_Map[data]])
     }
     sortable.sort(function(a, b) {return a[1] - b[1]});
     sequence = [];

     },

    _deleteRow : function (e) {

    },

    _deleteCol : function(e) {

    },

    render : function () {
      this._createLayout();
    }
});
