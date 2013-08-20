define('Board', function(){


function Board(){
	this.pages = new Array();
}

Board.prototype.addPage = function(page){
	this.pages.push(page);
};

return Board;

	
});