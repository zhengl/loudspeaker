define(['Board', 'Page'], function(Board, Page){

describe("Board", function(){
	it("should be able to have multiple Pages", function(){
		var board = new Board("board");
		var page1 = new Page();
		var page2 = new Page();
		var page3 = new Page();
		board.addPage(page1);
		board.addPage(page2);
		board.addPage(page2);
		
		expect(board.pages.length).toBe(3);
	});
});

});
