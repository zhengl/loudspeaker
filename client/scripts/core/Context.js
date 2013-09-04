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

Context.prototype.getDraftItems = function(){
	return this.draftItems;
};

Context.prototype.addItem = function(item){
	this.items.push(item)
};

Context.prototype.addDraftItem = function(draftItem){
	this.draftItems.push(draftItem)
};

Context.prototype.clearDraftItems = function(){
	this.draftItems = [];
};

Context.prototype.setMode = function(mode){
	this.mode = mode;
};

Context.prototype.isPainting = function(){
	return this.mode == Context.MODE.PAINTING;
};

Context.prototype.isTexting = function(){
	return this.mode == Context.MODE.TEXTING;
};

Context.prototype.isMoving = function(){
	return this.mode == Context.MODE.MOVING;
};

Context.MODE = {
	IDLE: "CONTEXT.IDLE",
	PAINTING: "CONTEXT.PAINTING",
	TEXTING: "CONTEXT.TEXTING",
	MOVING: "CONTEXT.MOVING",
};

return Context;

	
});