define('Unserializer', ['Line', 'Text', 'Note', 'DOMNoteFactory', 'KineticContext'], function(Line, Text, Note, DOMNoteFactory, KineticContext){


function Unserializer(){
	
}

Unserializer.prototype.process = function(context, json) {
	context.setUUID(json.uuid);
	var items = json.items;
	for(var i = 0; i < items.length; i++){
		var item = this.unserializeItem(items[i], context);
		context.addItem(item);
	}
};

Unserializer.prototype.unserializeItem = function(json, context) {
	switch(json.type) {
		case 'line':
			return this.unserializeLine(json);
		case 'text':
			return this.unserializeText(json);
		case 'note':
			return this.unserializeNote(json, context);
	}
};

Unserializer.prototype.unserializeLine = function(json) {
	var line = new Line(json.points, json.color);
	line.setUUID(json.uuid);
	line.setPosition(json.position);
	return line;
};

Unserializer.prototype.unserializeText = function(json) {
	var text = new Text(json.content, json.color);
	text.setUUID(json.uuid);
	text.setPosition(json.position);
	return text;
};

Unserializer.prototype.unserializeNote = function(json, context) {
	var note = new Note();
	note.setUUID(json.uuid);

	var noteElement = document.createElement('div');
	noteElement.id = 'note-' + note.getUUID();
	noteElement.className = 'note';

    noteRubbishbinElement = document.createElement('div');
    noteRubbishbinElement.id = 'note-rubbishbin' + note.getUUID();
    noteRubbishbinElement.className = 'rubbishbin';	

    if(context instanceof KineticContext) {
		note = DOMNoteFactory.create(
			noteElement,
			1280 / 6,
			1280 / 6,
			context.getPage().getPalette(),
			noteRubbishbinElement.id,
			100,
			20,
			context.getPage().getEventPreprocessor()
		);
	}

	note.moveTo(json.position);

	return note;
};

return Unserializer;


});