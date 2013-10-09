define("PanelTrigger", ['EventHandleable', 'PanelTriggerEventHandler', 'CssHelper'], function(EventHandleable, PanelTriggerEventHandler, CssHelper){


function PanelTrigger(element){
	this.panel = element;
}

PanelTrigger.prototype = new EventHandleable(new PanelTriggerEventHandler());
PanelTrigger.prototype.constructor = PanelTrigger;

PanelTrigger.prototype.collapsePanel = function() {
	CssHelper.removeClass(this.panel, "expand");
};

PanelTrigger.prototype.expandPanel = function() {
	CssHelper.addClass(this.panel, "expand");
};

PanelTrigger.prototype.togglePanel = function() {
	CssHelper.toggleClass(this.panel, "expand");
};

return PanelTrigger;

});