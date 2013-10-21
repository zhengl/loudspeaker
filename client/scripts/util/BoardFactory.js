define('BoardFactory', ['Board', 'PageFactory', 'Line', 'Text', 'Note'], function(Board, PageFactory, Line, Text, Note){

function BoardFactory(){
	this.pageClass = Board;
}

BoardFactory.prototype = new PageFactory();
BoardFactory.prototype.constructor = BoardFactory;

BoardFactory.prototype.getMovables = function() {
	return [Line, Text, Note];
};

return BoardFactory;
	
});