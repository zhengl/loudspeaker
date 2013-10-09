require(['PanelTrigger', 'EventBus', 'CssHelper'], function(PanelTrigger, EventBus, CssHelper){


describe("PanelTrigger", function(){
	
	it("close the panel when receiving START_DRAGGING", function(){
		var panel = document.createElement("div");
		panel.className = "panel expand";
		var eventBus = new EventBus();

		var trigger = new PanelTrigger(panel);
		trigger.enableEventHandling(eventBus);
		triggerStartDraggingEvent(eventBus, 0, 0); 

		expect(CssHelper.hasClass(panel, "expand")).toBeFalsy();
	});

});


});