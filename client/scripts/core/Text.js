define('Text', ['Item'], function(Item){


function Text(text, color){
	this.content = text;
	this.color = color;
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

Text.prototype.setColor = function(color) {
	this.color = color;
};

Text.prototype.getColor = function() {
	return this.color;
};

Text.prototype.serialize = function() {
	return {
		type: "text",
		content: this.content,
		color: this.color,
		position: this.position,
	}
};

Text.unserialize = function(json){
	var text = new Text(json.content, json.color);
	text.setPosition(json.position);
	return text;
}

return Text;


});