define('ContextFactory', ['Environment', 'Context', 'KineticContext'], function(Environment, Context, KineticContext){	


function ContextFactory(){
}

ContextFactory.create = function(){
	var context;

	switch(Environment.name){
		case Environment.Dummy.name:
			context = new Context();
		break;
		case Environment.Mouse.name:
			context = new KineticContext(Environment.containerId, Environment.containerWidth, Environment.containerHeight);
		break;
	}

	return context;
}

return ContextFactory;

	
});