define("DOMBoardFactory", ['KineticContext', 'DOMPaletteFactory', 'KineticPainter', 'KineticTexter', 'KineticTextInput', 'Mover', 'EventBus'], function(KineticContext, DOMPaletteFactory, KineticPainter, KineticTexter, KineticTextInput, Mover, EventBus){

function DOMBoardFactory(){

}

DOMBoardFactory.create = function(boardId, paletteId, rubbishbinId){
	var eventBus = new EventBus();
	
	var context = new KineticContext(boardId, 700, 700);
	context.enableEventHandling(eventBus);

	var palette = DOMPaletteFactory.create("palette");
	palette.enableEventHandling(eventBus);

	var painter = new KineticPainter(context, palette);
	painter.enableEventHandling(eventBus);

	var textInput = new KineticTextInput(context);
	textInput.enableEventHandling(eventBus);

	var texter = new KineticTexter(palette, textInput);
	texter.enableEventHandling(eventBus);

	var mover = new Mover(context);
	mover.enableEventHandling(eventBus);
}

return DOMBoardFactory;
	
});