define('KineticDraftLayer', ['Kinetic'], function(){


function KineticDraftLayer(){
	this.draftItems = [];
}

KineticDraftLayer.prototype = new Kinetic.Layer();
KineticDraftLayer.prototype.constructor = KineticDraftLayer;

KineticDraftLayer.prototype.addDraftItem = function(item) {
	this.draftItems.push(item)
	if(item.draftize){
		item.draftize();
	}
	if(item.kineticShape){
		item.getKineticShape().moveTo(this);
		this.draw();
	}
};

KineticDraftLayer.prototype.getDraftItems = function(){
	return this.draftItems;
};

KineticDraftLayer.prototype.clear = function() {
	this.draftItems = [];
	this.removeChildren();
	this.draw();
};

return KineticDraftLayer;

});