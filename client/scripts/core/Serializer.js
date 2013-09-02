define('Serializer', function(){


function Serializer(){
	
}

Serializer.prototype.process = function(context) {
	var items = context.getItems();
	var jsonizedItems = new Array();
	for(var i = 0; i < items.length; i++) {
		jsonizedItems.push(items[i].serialize());
	}

	return {
		uuid: context.getUUID(),
		items: jsonizedItems
	};
};

return Serializer;


});