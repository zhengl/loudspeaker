define('DOMRubbishBin', ['RubbishBin'], function(RubbishBin){


function DOMRubbishBin(leftTop, rightBottom, element){
	RubbishBin.call(this, leftTop, rightBottom);
	this.element = element;
	this.close();
}

DOMRubbishBin.prototype = new RubbishBin();
DOMRubbishBin.prototype.constructor = DOMRubbishBin;

DOMRubbishBin.prototype.close = function() {
	this.element.className = 'rubbishbin collapse';
	this.isOpen = false;
};

DOMRubbishBin.prototype.open = function() {
	this.element.className = 'rubbishbin expand';
	this.isOpen = true;
};

DOMRubbishBin.prototype.getElement = function() {
	return this.element;
};

return DOMRubbishBin;


});
