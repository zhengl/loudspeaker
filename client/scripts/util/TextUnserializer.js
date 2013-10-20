define('TextSerializer', ['Text'], function(Text){
	
function TextSerializer(){

}

TextSerializer.prototype.process = function(json) {
	var text = new Text(json.content, json.color);
	text.setUUID(json.uuid);
	text.setPosition(json.position);
	return text;
};

return TextSerializer;

});