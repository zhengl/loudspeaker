require(['config'], function(){

require(['app'], function(app){
	var board = app.start();

require(['Debugger'], function(Debugger){
	var d = new Debugger(board.getContext());
	d.enableEventHandling(board.getEventBus());
});

});


});
