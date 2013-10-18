define('Unserializer', ['Line', 'Text', 'Note'], function(Line, Text, Note){


function Unserializer(){
	
}

Unserializer.prototype.process = function(page, json) {
	page.getContext().setUUID(json.uuid);
	var items = json.items;
	for(var i = 0; i < items.length; i++){
		var item;
		switch(items[i].type) {
			case 'line':
				item = Line.unserialize(items[i]);
				page.getContext().addItem(item);
			break;
			case 'text':
				item = Text.unserialize(items[i]);
				page.getContext().addItem(item);
			break;
			case 'note':
				item = Note.unserialize(items[i]);
				page.addItem(item);
			break;
		}
	}
};

return Unserializer;


});