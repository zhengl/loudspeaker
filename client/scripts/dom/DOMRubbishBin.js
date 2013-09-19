define('DOMRubbishBin', ['RubbishBin', 'jquery'], function(RubbishBin, $){


function DOMRubbishBin(leftTop, rightBottom, elementId){
	RubbishBin.call(this, leftTop, rightBottom);
	this.element = document.getElementById(elementId);
	this.close();
}

DOMRubbishBin.prototype = new RubbishBin();
DOMRubbishBin.prototype.constructor = DOMRubbishBin;

DOMRubbishBin.prototype.close = function() {
	$(this.element).addClass("rubbishbin-collapse");
	$(this.element).removeClass("rubbishbin-expand");
	this.isOpen = false;
};

DOMRubbishBin.prototype.open = function() {
	$(this.element).addClass("rubbishbin-expand");
	$(this.element).removeClass("rubbishbin-collapse");
	this.isOpen = true;
};

return DOMRubbishBin;


});
