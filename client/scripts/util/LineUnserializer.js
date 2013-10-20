define('LineUnserializer', ['Line'], function(Line){
	
function LineUnserializer(){

}

LineUnserializer.prototype.process = function(json) {
	var line = new Line(json.points, json.color);
	line.setUUID(json.uuid);
	line.setPosition(json.position);
	return line;
};

return LineUnserializer;

});