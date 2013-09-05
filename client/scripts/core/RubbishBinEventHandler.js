define('RubbishBinEventHandler', ['Event'], function(Event){


function RubbishBinEventHandler(){
}

RubbishBinEventHandler.prototype.handle = {};

RubbishBinEventHandler.prototype.handle[Event.Page.FINISH_MOVING] = function(rubbishBin, event){
	if (rubbishBin.isInside(event.data[0])) {
		rubbishBin.open();
	}
};

RubbishBinEventHandler.prototype.handle[Event.Page.MOVE_TO] = function(rubbishBin, event){
	if (rubbishBin.isInside(event.data[0])) {
		rubbishBin.open();
	}
};

return RubbishBinEventHandler;

});