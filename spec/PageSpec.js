describe("Page", function() {
  var page;

  beforeEach(function() {
    page = new Page(new FakeContext());
  });

  it("should return an Item after drawing a line", function() {
    var item = page.drawLine();
	expect(page.context.getItems().length).toEqual(1);
    expect(item instanceof Item).toBe(true);
  });
  
  it("should be able to register event listeners", function() {
	var eventTrigger = new EventTrigger()
	eventTrigger.addListener(page);
	eventTrigger.triggerEvent(Event.START_DRAWING);
	expect(page.isPainting).toBe(true);
  });
  
  it("should listen to an event trigger adapter and draw a line with mouse", function() {
	var mouseEventTrigger = new EventTrigger();
	var eventTriggerAdapter = new MouseEventTriggerAdapter(mouseEventTrigger);
	eventTriggerAdapter.addListener(page);
	
	page.selectLine();
	
	mouseEventTrigger.triggerEvent(Event.MOVE_TO, new Point(10, 10));
	mouseEventTrigger.triggerEvent(Event.MOUSE_DOWN);
	mouseEventTrigger.triggerEvent(Event.MOVE_TO, new Point(20, 20));
	mouseEventTrigger.triggerEvent(Event.MOUSE_UP);
	
	var line = page.context.items[0];
	expect(line instanceof Line).toBe(true);
  });

});