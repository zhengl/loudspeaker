function EventChannelFactory(){
}

EventChannelFactory.create = function(){
	var eventTrigger = new EventTrigger();
	var eventTriggerAdapter;

	switch(Environment.name){
		case Environment.Dummy:
			eventTriggerAdapter = new EventTriggerAdapter(new DummyEventInterpreter());
		break;
		case Environment.Mouse:
			eventTriggerAdapter = new EventTriggerAdapter(new KineticEventOnPageInterpreter());
		break;
	}

	eventTrigger.addListener(eventTriggerAdapter);

	return new EventChannel(eventTrigger, eventTriggerAdapter);
};