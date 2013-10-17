define('PanelTriggerEventHandler', ['Event'], function(Event){


function PanelTriggerEventHandler(){
}

PanelTriggerEventHandler.prototype.handle = {};

PanelTriggerEventHandler.prototype.handle[Event.Note.START_DRAGGING] = function(trigger, event){
	trigger.collapsePanel();
};

return PanelTriggerEventHandler;

});