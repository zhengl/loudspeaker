function ContextFactory(){
}

ContextFactory.create = function(){
	var context;

	switch(Environment.name){
		case Environment.Dummy.name:
			context = new Context();
		break;
		case Environment.Mouse.name:
			context = new KineticContext(Environment.Mouse.containerId, Environment.Mouse.containerWidth, Environment.Mouse.containerHeight);
		break;
	}

	return context;
}