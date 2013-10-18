define('Context', function(){


function Context(){
	this.items = [];
	this.draftItems = [];
}

Context.prototype.getUUID = function(){
	return this.uuid;
};

Context.prototype.setUUID = function(uuid){
	this.uuid = uuid;
};

Context.prototype.getLastDraftItem = function(){
	return this.draftItems[this.draftItems.length - 1];
};

Context.prototype.getItems = function(){
	return this.items;
};

Context.prototype.removeItem = function(item){
	item.remove();
	for(var i = 0; i < this.items.length; i++){
		if(item === this.items[i]) {
			this.items.splice(i, 1);
		}
	}
};

Context.prototype.getDraftItems = function(){
	return this.draftItems;
};

Context.prototype.addItem = function(item){
	item.addTo(this);
};

Context.prototype.addDraftItem = function(draftItem){
	draftItem.addDraftTo(this);
};

Context.prototype.clearDraftItems = function(){
	this.draftItems = [];
};

return Context;

	
});