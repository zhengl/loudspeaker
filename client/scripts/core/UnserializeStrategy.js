define('UnserializeStrategy', ['Line', 'Text'], function(Line, Text){


function UnserializeStrategy(){
	
}

UnserializeStrategy.prototype.process = function(page, json) {
	page.setUUID(json.uuid);
	var items = json.items;
	for(var i = 0; i < items.length; i++){
		switch(items[i].type) {
			case 'line':
				var line = Line.unserialize(items[i]);
				page.draw(line);
			break;
			case 'text':
				var text = Text.unserialize(items[i]);
				page.write(text);
			break;
		}
	}
};

return UnserializeStrategy;


});