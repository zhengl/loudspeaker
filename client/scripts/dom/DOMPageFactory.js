define('DOMPageFactory', ['Page', 'Painter', 'Texter', 'Mover', 'KineticContext', 'KineticTextInput', 'EventBus', 'PageEventHandler', 'DOMRubbishBin','Point'], function(Page, Painter, Texter, Mover, KineticContext, KineticTextInput, EventBus, PageEventHandler, DOMRubbishBin, Point){


function DOMPageFactory(){
	
}

DOMPageFactory.create = function(options){
	var context = new KineticContext(options.id, options.width, options.height);

	var painter = new Painter(context, options.palette);

	var textInput = new KineticTextInput(context);
	var texter = new Texter(options.palette, textInput);
	var mover = new Mover(context);
	var bin = new DOMRubbishBin(new Point(options.width - options.rubbishBinWidth, 0), new Point(options.width, options.height), options.rubbishBinId);
	mover.setRubbishBin(bin);

	var page = new Page(painter, texter, mover);
	var eventBus = new EventBus();
	bin.registerEventBus(eventBus);
	var handler = new PageEventHandler();
	page.enableEventHandling(eventBus, handler);

	return page;
}

return DOMPageFactory;


});