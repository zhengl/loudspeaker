define('TextSamplerEventHandler', ['Text'], function(Text){

function TextSamplerEventHandler(){
}

TextSamplerEventHandler.prototype.handle = {};

TextSamplerEventHandler.prototype.handle[Event.Palette.SELECT_COLOR] = function(sampler, event){
	var text = new Text('T', event.data.color);
	sampler.getTexter().write(text);
};

return TextSamplerEventHandler;

});