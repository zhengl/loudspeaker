function EventTriggerAdapter(interpreter){
	EventTrigger.call(this);
	this.interpreter = interpreter;
}


EventTriggerAdapter.prototype = new EventTrigger();
EventTriggerAdapter.prototype.constructor = EventTriggerAdapter;

EventTriggerAdapter.prototype.notify = function(event){
	this.trigger(this.interpreter.interpret(event));
}