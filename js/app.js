var app = (function () {
 

  function Singleton( options )  {
 
    // set options to the options supplied
    // or an empty object if none are provided
    options = options || {};
    this.name = "ExcelSheet";
    this.view = options.view || {};
  }
  // our instance holder
  var instance;
  // an emulation of static variables and methods
  var _static  = {
    name:  "ExcelSheet",
    // Method for getting an instance. It returns
    // a singleton instance of a singleton object
    getInstance:  function( options ) {
      if( instance  ===  undefined )  {
        instance = new Singleton( options );
      }
      return  instance;
    }
  };
  return  _static;
})();
 
var myApp  =  app.getInstance({
  view: new this.excelSheetView()
});
 
myApp.view.render();


