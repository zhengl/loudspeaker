function Page(context) {
	this.context = context;
}

Page.prototype.drawLine = function() {
	var line = new Line();
	this.context.addItem(line);
	return line;
};

