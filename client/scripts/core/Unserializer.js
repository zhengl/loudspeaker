define('Unserializer', ['Line', 'Text'], function(Line, Text){


function Unserializer(){
	
}

Unserializer.prototype.process = function(context, json) {
	context.setUUID(json.uuid);
	var items = json.items;
	for(var i = 0; i < items.length; i++){
		switch(items[i].type) {
			case 'line':
				var line = Line.unserialize(items[i]);
				context.draw(line);
			break;
			case 'text':
				var text = Text.unserialize(items[i]);
				context.write(text);
			break;
		}
	}
};

return Unserializer;


});