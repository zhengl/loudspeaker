define('Unserializer', ['Line', 'Text', 'Note','LineUnserializer', 'TextUnserializer', 'NoteUnserializer'], function(Line, Text, Note, LineUnserializer, TextUnserializer, NoteUnserializer){


function Unserializer(){
	this.lineUnserializer = new LineUnserializer();
	this.textUnserializer = new TextUnserializer();
	this.noteUnserializer = new NoteUnserializer();
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
			return this.lineUnserializer.process(json);
		case 'text':
			return this.textUnserializer.process(json);
		case 'note':
			return this.noteUnserializer.process(json, context);
	}
};

return Unserializer;


});