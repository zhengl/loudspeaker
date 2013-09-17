define('TestHelper', ['Event'], function(Event){

	return {
		createText: function(){
			var text = new Text("Hello World!");
			text.setPosition(new Point(10, 20));
			return text;
		}

		expectOneItem: function(target){
			expect(target.getContext().getItems().length).toEqual(1);
		}

		expectOneDraftItem: function(target){
			expect(target.getContext().getDraftItems().length).toEqual(1);
		}
		
		expectNoItem: function(target){
			expect(target.getContext().getItems().length).toEqual(0);
		}
		
		expectNoDraftItem: function(target){
			expect(target.getContext().getDraftItems().length).toEqual(0);
		}

		triggerStartMovingEvent: function(eventBus, item, x, y){
			eventBus.publish(new Event(Event.Page.START_MOVING, [item, new Point(x, y)]));
		}
		
		triggerFinishMovingEvent: function(eventBus, item){
			eventBus.publish(new Event(Event.Page.FINISH_MOVING, [item]));
		}

		triggerMoveToEvent: function(eventBus, x, y){
			eventBus.publish(new Event(Event.Page.MOVE_TO, [new Point(x, y)]));
		}

		triggerPageDrawToEvent: function(eventBus, x, y){
			eventBus.publish(new Event(Event.Page.DRAW_TO, [new Point(x, y)]));
		}

		triggerStartDrawingEvent: function(eventBus, x, y){
			eventBus.publish(new Event(Event.Page.START_DRAWING, [new Point(x, y)]));		
		}

		triggerFinishDrawingEvent: function(eventBus, x, y){
			eventBus.publish(new Event(Event.Page.FINISH_DRAWING, [new Point(x, y)]));		
		}

		triggerStopDrawingEvent: function(eventBus){
			eventBus.publish(new Event(Event.Page.STOP_DRAWING));		
		}

		triggerStartTextingEvent: function(eventBus, x, y){
			eventBus.publish(new Event(Event.Page.START_TEXTING, [new Point(x, y)]));
		}

		createEvent: function(type, x, y, target){
			var options = {
				bubbles: false,
				cancelable: false,
				view: window,
				detail: 0,
				screenX: 0,
				screenY: 0,
				clientX: x,
				clientY: y,
				ctrlKey: false,
				altKey: false,
				shiftKey: false,
				metaKey: false,
				button: 0,
				relatedTarget: undefined
			};
			var event = document.createEvent('MouseEvents');
			event.initMouseEvent( type, options.bubbles, options.cancelable,
				options.view, options.detail,
				options.screenX, options.screenY, options.clientX, options.clientY,
				options.ctrlKey, options.altKey, options.shiftKey, options.metaKey,
				options.button, options.relatedTarget || document.body.parentNode );
			event.targetItem = target;
			return event;
		}			
	}

});
