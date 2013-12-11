define('TextSampler', ['EventHandleable', 'TextSamplerEventHandler'], function(EventHandleable, TextSamplerEventHandler){

function TextSampler(texter){
	this.texter = texter;
}

TextSampler.prototype = new EventHandleable(new TextSamplerEventHandler());
TextSampler.prototype.constructor = TextSampler;

TextSampler.prototype.getTexter = function() {
	return this.texter;
};

return TextSampler;

});