define('SerializeStrategy', function(){


function SerializeStrategy(){
	
}

SerializeStrategy.prototype.process = function(page) {
	var items = page.context.getItems();
	var jsonizedItems = new Array();
	for(var i = 0; i < items.length; i++) {
		jsonizedItems.push(items[i].serialize());
	}

	return {items: jsonizedItems};
};

return SerializeStrategy;


});