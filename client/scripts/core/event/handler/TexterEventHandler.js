define('TexterEventHandler', ['Event'], function(Event){


function TexterEventHandler(){
}

TexterEventHandler.prototype.handle = {};

TexterEventHandler.prototype.handle[Event.Page.START_TEXTING] = function(texter, event){
	texter.startTexting(event.data.position);
};

TexterEventHandler.prototype.handle[Event.Page.FINISH_TEXTING] = function(texter, event){
	texter.finishTexting();
};

return TexterEventHandler;

});