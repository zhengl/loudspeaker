define('RubbishBinEventHandler', ['Event'], function(Event){


function RubbishBinEventHandler(){
}

RubbishBinEventHandler.prototype.handle = {};


RubbishBinEventHandler.prototype.handle[Event.Page.MOVE_TO] = function(rubbishBin, event){
	if (rubbishBin.isInside(event.data[0])) {
		rubbishBin.open();
	} else {
		rubbishBin.close();
	}
};

return RubbishBinEventHandler;

});