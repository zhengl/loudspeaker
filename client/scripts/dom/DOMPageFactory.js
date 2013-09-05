define("DOMPageFactory", ['Page', 'KineticContext', 'DOMPaletteFactory', 'KineticPainter', 'KineticTexter', 'KineticTextInput', 'Mover', 'DOMRubbishBin', 'EventBus', 'Point'], function(Page, KineticContext, DOMPaletteFactory, KineticPainter, KineticTexter, KineticTextInput, Mover, DOMRubbishBin, EventBus, Point){

function DOMPageFactory(){

}

DOMPageFactory.create = function(pageId, pageWidth, pageHeight, paletteId, rubbishbinId, rubbishbinWidth, rubbishbinHeight){
	var page = new Page();

	var eventBus = new EventBus();
	page.setEventBus(eventBus);
	
	var context = new KineticContext(pageId, pageWidth, pageHeight);
	context.enableEventHandling(eventBus);
	context.disableEventHandling();

	var palette = DOMPaletteFactory.create(paletteId);
	palette.enableEventHandling(eventBus);
	page.setPalette(palette);

	var painter = new KineticPainter(context, palette);
	painter.enableEventHandling(eventBus);
	page.setPainter(painter);

	var textInput = new KineticTextInput(context);
	textInput.enableEventHandling(eventBus);

	var texter = new KineticTexter(palette, textInput);
	texter.enableEventHandling(eventBus);
	page.setPainter();

	var mover = new Mover(context);
	mover.enableEventHandling(eventBus);
	page.setMover(mover);

	var rubbishbin = new DOMRubbishBin(new Point(pageWidth - rubbishbinWidth, 0), new Point(pageWidth, pageHeight - rubbishbinHeight), rubbishbinId);
	rubbishbin.enableEventHandling(eventBus);
	mover.setRubbishBin(rubbishbin);

	return page;
}

return DOMPageFactory;
	
});