define('DOMBoardFactory', ['Page', 'Painter', 'Texter', 'Mover', 'DOMPalette', 'KineticContext', 'KineticTextInput', 'EventBus', 'PageEventHandler', 'DOMRubbishBin','Point'], function(Page, Painter, Texter, Mover, DOMPalette, KineticContext, KineticTextInput, EventBus, PageEventHandler, DOMRubbishBin, Point){


function DOMBoardFactory(){
	
}

DOMBoardFactory.create = function(boardId, paletteId, rubbishBinId) {
		var palette = new DOMPalette(paletteId);
		palette.addColorButton('red');
		palette.addColorButton('blue');
		palette.addColorButton('black');
		var context = new KineticContext(boardId, 700, 700);

		var painter = new Painter(context, palette);

		var textInput = new KineticTextInput(context);
		var texter = new Texter(palette, textInput);
		var mover = new Mover(context);
		var bin = new DOMRubbishBin(new Point(600, 0), new Point(700, 700), rubbishBinId);
		mover.setRubbishBin(bin);

		page = new Page(painter, texter, mover);
		eventBus = new EventBus();
		bin.registerEventBus(eventBus);
		var handler = new PageEventHandler();
		page.enableEventHandling(eventBus, handler);	
};

return DOMBoardFactory;


});