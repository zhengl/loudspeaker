define('DOMRubbishBin', ['RubbishBin', 'jquery'], function(RubbishBin, $){


function DOMRubbishBin(leftTop, rightBottom, elementId){
	RubbishBin.call(this, leftTop, rightBottom);
	this.element = document.getElementById(elementId);
	this.close();
}

DOMRubbishBin.prototype = new RubbishBin();
DOMRubbishBin.prototype.constructor = DOMRubbishBin;

DOMRubbishBin.prototype.close = function() {
	$(this.element).addClass("collapse");
	$(this.element).removeClass("expand");
	this.isOpen = false;
};

DOMRubbishBin.prototype.open = function() {
	$(this.element).removeClass("collapse");
	$(this.element).addClass("expand");
	this.isOpen = true;
};

return DOMRubbishBin;


});
