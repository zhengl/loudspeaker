function FakeContext(){
	this.items = new Array();
}

FakeContext.prototype.getItems = function(){
	return this.items;
}

FakeContext.prototype.addItem = function(item){
	this.items.push(item)
}