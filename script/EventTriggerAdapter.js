function EventTriggerAdapter(interpreter){
	this.interpreter = interpreter;
}

EventTriggerAdapter.prototype = new EventTrigger();

EventTriggerAdapter.prototype.notify = function(event){
	this.trigger(this.interpreter.interpret(event));
}