function KineticText(text){
	this.kineticShape = new Kinetic.Text({
		text: text,
		fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green'
	});
}

KineticText.prototype = new Text();
KineticText.prototype.constructor = KineticText;

KineticText.prototype.getKineticShape = function(){
	return this.kineticShape;
};