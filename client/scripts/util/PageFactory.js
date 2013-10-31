define('PageFactory', ['Page', 'KineticContext', 'KineticPainter', 'KineticTexter', 'KineticTextInput', 'Mover', 'DOMRubbishBin', 'EventBus', 'Point', 'MouseEventInterpreter', 'PaintingGestureDetector', 'TextingGestureDetector', 'MovingGestureDetector', 'KineticLine'], function(Page, KineticContext, KineticPainter, KineticTexter, KineticTextInput, Mover, DOMRubbishBin, EventBus, Point, MouseEventInterpreter, PaintingGestureDetector, TextingGestureDetector, MovingGestureDetector, KineticLine){

function PageFactory(options){
	this.pageClass = Page;
	this.options = options;
}

PageFactory.prototype.create = function(){
	var page = new this.pageClass();
	page.setElement(this.options.element);
	page.setPosition(new Point(0, 0));

	var eventBus = this.createEventBus();
	page.setEventBus(eventBus);

	page.setPalette(this.options.palette);
	
	var interpreter = this.createInterpreter(eventBus, this.options.eventPreprocessor, this.options.globalEventBus);

	var context = this.createContext(this.options.element, this.options.width, this.options.height, interpreter);
	page.setContext(context);
	context.setPage(page);

	var painter = this.createPainter(context, this.options.palette, eventBus);
	page.setPainter(painter);

	var texter = this.createTexter(context, this.options.palette, eventBus);
	page.setTexter(texter);

	var mover = this.createMover(context, eventBus, this.options.rubbishbin, this.options.width, this.options.height, this.options.element);
	page.setMover(mover);

	return page;
};

PageFactory.prototype.setOptions = function(options) {
	this.options = options;
};

PageFactory.prototype.setElement = function(element) {
	this.options.element = element;
};

PageFactory.prototype.getMovables = function() {
	return [];
};

PageFactory.prototype.createEventBus = function() {
	var eventBus = new EventBus();

	return eventBus;
};

PageFactory.prototype.createInterpreter = function(eventBus, eventPreprocessor, globalEventBus) {
	var interpreter = new MouseEventInterpreter(eventPreprocessor);
	interpreter.addDetector(new PaintingGestureDetector(eventBus, interpreter));
	interpreter.addDetector(new TextingGestureDetector(eventBus, interpreter));
	interpreter.addDetector(new MovingGestureDetector(eventBus, interpreter));
	
	return interpreter;
};

PageFactory.prototype.createContext = function(element, width, height, interpreter) {
	var context = new KineticContext(element.id, width, height);
	context.enableEventHandling(interpreter);

	return context;
};

PageFactory.prototype.createPainter = function(context, palette, eventBus) {
	var painter = new KineticPainter(KineticLine, context, palette);
	painter.enableEventHandling(eventBus);

	return painter;
};

PageFactory.prototype.createTextInput = function(context, eventBus) {
	var textInput = new KineticTextInput(context);
	textInput.enableEventHandling(eventBus);

	return textInput;
};

PageFactory.prototype.createTexter = function(context, palette, eventBus) {
	var textInput = this.createTextInput(context, eventBus);
	var texter = new KineticTexter(palette, textInput);
	texter.enableEventHandling(eventBus);

	return texter;
};

PageFactory.prototype.createRubbishBin = function(element, leftTop, rightBottom, eventBus) { 
	var rubbishbin = new DOMRubbishBin(leftTop, rightBottom, element);
	rubbishbin.enableEventHandling(eventBus);

	return rubbishbin;
};

PageFactory.prototype.createMover = function(context, eventBus, rubbishbinOptions, width, height, element) {
	var mover = new Mover(context);
	mover.enableEventHandling(eventBus);
	mover.setMovables(this.getMovables());

	if(rubbishbinOptions) {
		var rubbishbin = this.createRubbishBin(rubbishbinOptions.element, new Point(width - rubbishbinOptions.width, 0), new Point(width, rubbishbinOptions.height), eventBus);
		mover.setRubbishBin(rubbishbin);
		element.appendChild(rubbishbin.element);
	}	

	return mover;
};

return PageFactory;
	
});