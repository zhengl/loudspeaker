describe("Page", function() {
  var page;

  beforeEach(function() {
    page = new Page(new Context());
  });

  it("should return an Line after drawing a line", function() {
    var item = page.drawLine(new Point(0, 0), new Point(10, 10));
	expect(page.context.getItems().length).toEqual(1);
    expect(item instanceof Line).toBe(true);
  });
  
  it("should be able to register event triggers", function() {
	var eventTrigger = new EventTrigger();
	page.registerEventTrigger(eventTrigger);
	eventTrigger.trigger(new Event(Page.Event.START_DRAWING));
	console.log(page);
	expect(page.isPainting).toBe(true);
  });
  
  it("should listen to events by adapter and draw a line with mouse", function() {
	page.selectLine();
	
	var eventTrigger = new EventTrigger();
	var eventTriggerAdapter = new EventTriggerAdapter(new DummyEventInterpreter());
	eventTrigger.addListener(eventTriggerAdapter);
	page.registerEventTrigger(eventTriggerAdapter);
	
	eventTrigger.trigger(new Event(Page.Event.MOVE_TO, [new Point(10, 10)]));
	eventTrigger.trigger(new Event(Page.Event.START_DRAWING));
	eventTrigger.trigger(new Event(Page.Event.MOVE_TO, [new Point(20, 20)]));
	eventTrigger.trigger(new Event(Page.Event.STOP_DRAWING));
	
	var line = page.context.items[0];
	expect(line instanceof Line).toBe(true);
  });
  
  describe("with KineticJS implementation", function(){
	  beforeEach(function() {
		page = new Page(new KineticContext("board"));
	  });
  
	  it("should return an Item after drawing a line", function() {
		var item = page.drawLine(new Point(0, 0), new Point(10, 10));
		expect(page.context.getItems().length).toEqual(1);
		expect(item instanceof Item).toBe(true);
	  });
  });

});