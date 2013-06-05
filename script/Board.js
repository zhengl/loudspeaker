function Board(){
	this.pages = new Array();
}

Board.prototype.addPage = function(page){
	this.pages.push(page);
};