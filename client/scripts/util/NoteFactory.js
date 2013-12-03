define('NoteFactory', ['PageFactory', 'Note', 'Line', 'Text', 'MouseEventInterpreter', 'PaintingGestureDetector', 'TextingGestureDetector', 'MovingGestureDetector', 'NoteDraggingGestureDetector'], function(PageFactory, Note, Line, Text, MouseEventInterpreter, PaintingGestureDetector, TextingGestureDetector, MovingGestureDetector, NoteDraggingGestureDetector){

function NoteFactory(){
	this.pageClass = Note;
}

NoteFactory.prototype = new PageFactory();
NoteFactory.prototype.constructor = NoteFactory;

NoteFactory.prototype.createInterpreter = function(eventBus, eventPreprocessor, globalEventBus) {
	var interpreter = new MouseEventInterpreter(eventPreprocessor);
	interpreter.addDetector(new PaintingGestureDetector(eventBus, interpreter));
	interpreter.addDetector(new TextingGestureDetector(eventBus, interpreter));
	interpreter.addDetector(new NoteDraggingGestureDetector(globalEventBus, interpreter));
	interpreter.addDetector(new MovingGestureDetector(eventBus, interpreter));
	
	return interpreter;
};

NoteFactory.prototype.takeAddtionalAction = function(note) {
	this.adjustPosition(note);
};

NoteFactory.prototype.adjustPosition = function(note) {
	var self = this;
	window.addEventListener('resize', function() {
		note.setZoomPercentage(self.options.width / note.getElement().offsetWidth);
		console.log(self.options.width / note.getElement().offsetWidth)
		if(undefined !== note.getParent()){
			note.moveTo(note.getPosition());
		}
	});
};

NoteFactory.prototype.getMovables = function() {
	return [Line, Text];
};

return NoteFactory;
	
});