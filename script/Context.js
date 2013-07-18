function Context(){
	this.items = new Array();
	this.draftItems = new Array();
}

Context.prototype.registerEventBus = function(inputEventTrigger){
};

Context.prototype.getLastDraftItem = function(){
	return this.draftItems[this.draftItems.length - 1];
};

Context.prototype.getItems = function(){
	return this.items;
};

Context.prototype.removeItem = function(item){
	var resultItems = new Array();
	for(var index in this.items){
		if(item != this.items[index]) {
			resultItems.push(this.items[index]);
		}
	}
	this.items = resultItems;
};

Context.prototype.setEventTrigger = function(eventTrigger){
	this.eventTrigger = eventTrigger;
};

Context.prototype.getEventTrigger = function(){
	return this.eventTrigger;
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

Context.prototype.write = function(item){
	this.addItem(item);
	return item;
};

Context.prototype.startDraft = function(type, point){
	var draftItem = new window[type];
	draftItem.update(point);
	this.addDraftItem(draftItem);
	return draftItem;
};

Context.prototype.draft = function(draftItem){
	this.clearDraftItems();
	this.addDraftItem(draftItem);
	return draftItem;
};

Context.prototype.clearDraftItems = function(){
	this.draftItems = [];
};

Context.prototype.refreshItems = function(){};

Context.prototype.refreshDraftItems = function(){};