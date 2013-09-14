define('Unserializer', ['Line', 'Text'], function(Line, Text){


function Unserializer(){
	
}

Unserializer.prototype.process = function(context, json) {
	context.setUUID(json.uuid);
	var items = json.items;
	for(var i = 0; i < items.length; i++){
		var item;
		switch(items[i].type) {
			case 'line':
				item = Line.unserialize(items[i]);
			break;
			case 'text':
				item = Text.unserialize(items[i]);
			break;
		}
		context.addItem(item);
	}
};

return Unserializer;


});