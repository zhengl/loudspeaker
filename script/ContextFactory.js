function ContextFactory(){
}

ContextFactory.create = function(){
	var context;

	switch(Environment.name){
		case Environment.Dummy:
			context = new Context();
		break;
		case Environment.Mouse:
			context = new KineticContext('board', 50, 50);
		break;
	}

	return context;
}