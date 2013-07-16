function Text(text){
	this.content = text;
}

Text.prototype = new Item();
Text.prototype.constructor = Text;

Text.prototype.getValue = function(){
	return this.content;
};

Text.prototype.setValue = function(text){
	this.content = text;
};

Text.prototype.draftize = function(){
	return this;
};

Text.prototype.undraftize = function(){
	return this;
};