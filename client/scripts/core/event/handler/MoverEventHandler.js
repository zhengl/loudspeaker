define('MoverEventHandler', ['Event'], function(Event){


function MoverEventHandler(){
}

MoverEventHandler.prototype.handle = {};

MoverEventHandler.prototype.handle[Event.Page.START_MOVING] = function(mover, event){
	mover.startMoving(event.data.item, event.data.position);
};

MoverEventHandler.prototype.handle[Event.Page.MOVE_TO] = function(mover, event){
	mover.moveTo(event.data.position);
};

MoverEventHandler.prototype.handle[Event.Page.FINISH_MOVING] = function(mover, event){
	mover.finishMoving();
};

return MoverEventHandler;

});