define('SerializeStrategy', function(){


function SerializeStrategy(){
	
}

SerializeStrategy.prototype.process = function(page) {
	var items = page.getContext().getItems();
	var jsonizedItems = new Array();
	for(var i = 0; i < items.length; i++) {
		jsonizedItems.push(items[i].serialize());
	}

	return {
		uuid: page.getUUID(),
		items: jsonizedItems
	};
};

return SerializeStrategy;


});