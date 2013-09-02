define('Context', function(){


function Context(){
	this.items = new Array();
	this.draftItems = new Array();
}

Context.prototype.getUUID = function(){
	return this.uuid;
};

Context.prototype.setUUID = function(uuid){
	this.uuid = uuid;
};

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
	for(var i = 0; i < this.items.length; i++){
		if(item != this.items[i]) {
			resultItems.push(this.items[i]);
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

Context.prototype.startDraft = function(item){
	this.addDraftItem(item);
	return item;
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

return Context;

	
});