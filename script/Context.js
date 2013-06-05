function Context(){
	this.items = new Array();
}

Context.prototype.getItems = function(){
	return this.items;
}

Context.prototype.addItem = function(item){
	this.items.push(item)
}

Context.prototype.draw = function(item){
	this.addItem(item);
	return item;
}