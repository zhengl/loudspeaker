function EventChannelFactory(){
}

EventChannelFactory.create = function(target){
	var eventTrigger = new EventTrigger();
	var eventTriggerAdapter;

	switch(Environment.name){
		case Environment.Dummy.name:
			eventTriggerAdapter = new EventTriggerAdapter(new DummyEventInterpreter());
		break;
		case Environment.Mouse.name:
			if (target instanceof Page) {
				eventTriggerAdapter = new EventTriggerAdapter(new KineticMouseEventOnPageInterpreter());
			} else if (target instanceof Item) {
				eventTriggerAdapter = new EventTriggerAdapter(new KineticMouseEventOnItemInterpreter());
			}
		break;
	}

	eventTrigger.addListener(eventTriggerAdapter);

	var eventChannel = new EventChannel(eventTrigger, eventTriggerAdapter);
	return eventChannel;
};