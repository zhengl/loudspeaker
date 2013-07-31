describe("KineticMouseEventOnPageInterpreter", function(){
	var interpreter;
	var page;

	beforeEach(function(){
		Environment.setDummy();
		page = new Page();
		interpreter = new KineticMouseEventOnPageInterpreter(page);		
	});

	// it("should return Page.START_DRAWING event when receiving MOUSEDOWN event", function(){
	// 	page.selectPaintingMode();
	// 	expect(interpreter.interpret(createMouseDownEvent()).name).toBe(Page.Event.START_DRAWING);
	// });

	// it("should return return Page.NULL event when receiving MOUSEMOVE event", function(){
	// 	expect(interpreter.interpret(createMouseMoveEvent(10, 10))).toBeNull();
	// });

	// it("should return return Page.NULL event when receiving MOUSEUP event", function(){
	// 	expect(interpreter.interpret(createMouseUpEvent())).toBeNull();
	// });

	// it("should return Page.START_SELECTING_COLOR event when long pressing", function(){
	// 	KineticMouseEventOnPageInterpreter.defaultLongPressTimeout = 10;
	// 	expect(interpreter.interpret(createMouseDownEvent())).toBeNull();
	// 	sleep(15);
		
	// });

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