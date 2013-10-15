define('DOMBoardFactory', ['Page', 'KineticContext', 'KineticPainter', 'KineticTexter', 'KineticTextInput', 'Mover', 'DOMRubbishBin', 'EventBus', 'Line', 'Text', 'Point', 'Note', 'Board', 'MouseEventInterpreter', 'PaintingGestureDetector', 'TextingGestureDetector', 'MovingGestureDetector'], function(Page, KineticContext, KineticPainter, KineticTexter, KineticTextInput, Mover, DOMRubbishBin, EventBus, Line, Text, Point, Note, Board, MouseEventInterpreter, PaintingGestureDetector, TextingGestureDetector, MovingGestureDetector){

function DOMBoardFactory(){

}

DOMBoardFactory.create = function(pageElement, pageWidth, pageHeight, palette, rubbishbinId, rubbishbinWidth, rubbishbinHeight, eventPreprocessor){
	var board = new Board();
	board.setPosition(new Point(0, 0));

	board.setElement(pageElement);

	var eventBus = new EventBus();
	board.setEventBus(eventBus);
	
	var interpreter = new MouseEventInterpreter(eventPreprocessor);
	interpreter.addDetector(new PaintingGestureDetector(eventBus, interpreter));
	interpreter.addDetector(new TextingGestureDetector(eventBus, interpreter));
	interpreter.addDetector(new MovingGestureDetector(eventBus, interpreter));

	var context = new KineticContext(pageElement.id, pageWidth, pageHeight);
	context.enableEventHandling(interpreter);
	board.setContext(context);
	context.setPage(board);

	board.setPalette(palette);

	var painter = new KineticPainter(context, palette);
	painter.enableEventHandling(eventBus);
	board.setPainter(painter);

	var textInput = new KineticTextInput(context);
	textInput.enableEventHandling(eventBus);

	var texter = new KineticTexter(palette, textInput);
	texter.enableEventHandling(eventBus);
	board.setTexter(texter);

	var mover = new Mover(context);
	mover.enableEventHandling(eventBus);
	mover.setMovables([Line, Text, Note]);
	board.setMover(mover);

	var rubbishbin = new DOMRubbishBin(new Point(pageWidth - rubbishbinWidth, 0), new Point(pageWidth, rubbishbinHeight), rubbishbinId);
	rubbishbin.enableEventHandling(eventBus);
	mover.setRubbishBin(rubbishbin);

	return board;
};

return DOMBoardFactory;
	
});