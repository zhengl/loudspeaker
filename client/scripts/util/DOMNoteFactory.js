define("DOMNoteFactory", ['Page', 'KineticContext', 'KineticPainter', 'KineticTexter', 'KineticTextInput', 'Mover', 'DOMRubbishBin', 'EventBus', 'Line', 'Text', 'Point', 'Note', 'MouseEventInterpreter', 'PaintingGestureDetector', 'TextingGestureDetector', 'MovingGestureDetector', 'NoteDraggingGestureDetector'], function(Page, KineticContext, KineticPainter, KineticTexter, KineticTextInput, Mover, DOMRubbishBin, EventBus, Line, Text, Point, Note, MouseEventInterpreter, PaintingGestureDetector, TextingGestureDetector, MovingGestureDetector, NoteDraggingGestureDetector){

function DOMNoteFactory(){

}

DOMNoteFactory.create = function(pageElement, pageWidth, pageHeight, palette, rubbishbinId, rubbishbinWidth, rubbishbinHeight, eventPreprocessor, board){
	var note = new Note();
	note.setPosition(new Point(0, 0));

	note.setElement(pageElement);

	var eventBus = new EventBus();
	note.setEventBus(eventBus);
	
	var interpreter = new MouseEventInterpreter(eventBus, [
			PaintingGestureDetector,
			TextingGestureDetector,
			MovingGestureDetector,
			NoteDraggingGestureDetector
			], eventPreprocessor);

	var context = new KineticContext(pageElement.id, pageWidth, pageHeight);
	context.enableEventHandling(interpreter);
	note.setContext(context);
	context.setPage(note);

	note.setPalette(palette);

	var painter = new KineticPainter(context, palette);
	painter.enableEventHandling(eventBus);
	note.setPainter(painter);

	var textInput = new KineticTextInput(context);
	textInput.enableEventHandling(eventBus);

	var texter = new KineticTexter(palette, textInput);
	texter.enableEventHandling(eventBus);
	note.setTexter(texter);

	var mover = new Mover(context);
	mover.enableEventHandling(eventBus);
	mover.setMovables([Line, Text, Note]);
	note.setMover(mover);

	var rubbishbin = new DOMRubbishBin(new Point(pageWidth - rubbishbinWidth, 0), new Point(pageWidth, rubbishbinHeight), rubbishbinId);
	rubbishbin.enableEventHandling(eventBus);
	mover.setRubbishBin(rubbishbin);

	return note;
}

return DOMNoteFactory;
	
});