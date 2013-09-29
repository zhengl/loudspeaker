define('Board', ['Page'], function(Page){

function Board(){
	
}

Board.prototype = new Page();
Board.prototype.constructor = Board;

return Board;

});