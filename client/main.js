require.config({
	baseUrl: "scripts",
	paths: {
		Kinetic: '../../lib/kinetic/kinetic-v4.5.3.min'
	},
	urlArgs: "bust=" + (new Date()).getTime()
});

require(['Environment', 'Page', 'EventBus'], function(Environment, Page, EventBus){
	Environment.setMouse();
  
	var page = new Page();
	page.enableEventHandling(new EventBus());
});