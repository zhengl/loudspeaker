function Text(text){
	this.content = text;
}

Text.prototype.getValue = function(){
	return this.content;
};

Text.prototype.setValue = function(text){
	this.content = text;
};