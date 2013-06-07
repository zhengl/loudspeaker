function Context(){
	this.items = new Array();
	this.draftItems = new Array();
}

Context.prototype.getItems = function(){
	return this.items;
};

Context.prototype.getDraftItems = function(){
	return this.draftItems;
};

Context.prototype.addItem = function(item){
	this.items.push(item)
};

Context.prototype.addDraftItem = function(draftItem){
	this.draftItems.push(draftItem)
};

Context.prototype.draw = function(item){
	this.addItem(item);
	return item;
};

Context.prototype.draft = function(draftItem){
	this.clearDraftItems();
	this.addDraftItem(draftItem);
	return draftItem;
};

Context.prototype.clearDraftItems = function(){
	this.draftItems = [];
}