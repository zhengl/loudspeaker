require(['config'], function(){


require(['app', 'Debugger'], function(app, Debugger){
    componants = app.start();
    var eventDebugger = new Debugger();
    eventDebugger.adhereTo(componants.board);
    eventDebugger.adhereTo(componants.note);
    componants.globalEventBus.addListener(eventDebugger);
});


});