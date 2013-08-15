describe("KineticMouseEventOnPageInterpreter", function(){
	var interpreter;
	var page;
	var eventBus;

	beforeEach(function(){
		Environment.setDummy();
		eventBus = new EventBus();
		page = new Page();
		page.enableEventHandling(eventBus);
		interpreter = new KineticMouseEventOnPageInterpreter(page);		
	});

	function sleep(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
	    	break;
	    }
	  }
	}

	function createMouseDownEvent(){
		return createMouseEvent(KineticEvent.MOUSE_DOWN);
	}

	function createMouseUpEvent(){
		return createMouseEvent(KineticEvent.MOUSE_UP);
	}

	function createMouseMoveEvent(x, y){
		return createMouseEvent(KineticEvent.MOVE_TO, x, y);
	}

	function createMouseEvent(eventType, x, y){
		var event  = document.createEvent("MouseEvents");
		event.initMouseEvent(eventType, false, false, window, 0, 0, 0, x, y, false, false, false, false, 0, null);
		return event;
	}
});
