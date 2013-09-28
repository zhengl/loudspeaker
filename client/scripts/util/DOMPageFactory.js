define("DOMPageFactory", ['Page', 'KineticContext', 'DOMPalette', 'KineticPainter', 'KineticTexter', 'KineticTextInput', 'Mover', 'DOMRubbishBin', 'EventBus', 'Point', 'MouseEventInterpreter', 'PaintingGestureDetector', 'TextingGestureDetector', 'PaletteGestureDetector', 'SelectingGestureDetector', 'MovingGestureDetector'], function(Page, KineticContext, DOMPalette, KineticPainter, KineticTexter, KineticTextInput, Mover, DOMRubbishBin, EventBus, Point, MouseEventInterpreter, PaintingGestureDetector, TextingGestureDetector, PaletteGestureDetector, SelectingGestureDetector, MovingGestureDetector){

function DOMPageFactory(){

}

DOMPageFactory.create = function(pageId, pageWidth, pageHeight, palette, rubbishbinId, rubbishbinWidth, rubbishbinHeight, eventPreprocessor){
	var page = new Page();

	var eventBus = new EventBus();
	page.setEventBus(eventBus);
	
	var interpreter = new MouseEventInterpreter(eventBus, [
			PaintingGestureDetector,
			TextingGestureDetector,
			MovingGestureDetector
			], eventPreprocessor);

	var context = new KineticContext(pageId, pageWidth, pageHeight);
	context.enableEventHandling(interpreter);
	page.setContext(context);

	var palette = new DOMPalette(palette);
	palette.enableEventHandling(eventBus, interpreter);
	page.setPalette(palette);

	var painter = new KineticPainter(context, palette);
	painter.enableEventHandling(eventBus);
	page.setPainter(painter);

	var textInput = new KineticTextInput(context);
	textInput.enableEventHandling(eventBus);

	var texter = new KineticTexter(palette, textInput);
	texter.enableEventHandling(eventBus);
	page.setTexter(texter);

	var mover = new Mover(context);
	mover.enableEventHandling(eventBus);
	page.setMover(mover);

	var rubbishbin = new DOMRubbishBin(new Point(pageWidth - rubbishbinWidth, 0), new Point(pageWidth, rubbishbinHeight), rubbishbinId);
	rubbishbin.enableEventHandling(eventBus);
	mover.setRubbishBin(rubbishbin);

	return page;
}

return DOMPageFactory;
	
});