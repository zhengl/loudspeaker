require(['NoteDragger', 'Note', 'Point', 'Board', 'Context'], function(NoteDragger, Note, Point, Board, Context){


describe('NoteDragger', function(){
	var dragger;
	var note;
	var noteElement;
	var panel;

	beforeEach(function(){
		dragger = new NoteDragger();
		note = new Note();

		panel = document.createElement('div');
		panel.style.position = "fixed";
		panel.style.top = "100px";
		panel.style.left = "200px";

		noteElement = document.createElement('div');
		note.setElement(noteElement);

		document.body.appendChild(panel);
		panel.appendChild(noteElement);
	});

	it("appends to body after starting dragging", function(){
		dragger.startDragging(note, new Point(10, 10));
		var noteElement = note.getElement();
		expect(noteElement.parentNode).toEqual(document.body);
		expect(noteElement.style.position).toEqual("absolute");
		expect(noteElement.style.top).toEqual("100px");
		expect(noteElement.style.left).toEqual("200px");
	});

	it("drags a note to absolute position", function(){
		dragger.startDragging(note, new Point(10, 10));
		dragger.dragTo(new Point(30, 30));
		expect(noteElement.style.top).toEqual("20px");
		expect(noteElement.style.left).toEqual("20px");
	});

	afterEach(function(){
		noteElement.parentNode.removeChild(noteElement);
		document.body.removeChild(panel);
	});

	describe("with droppable", function(){
		var boardElement;

		beforeEach(function(){
			var board = new Board();
			boardElement = document.createElement("div");
			boardElement.style.position = "fixed";
			boardElement.style.top = "10px";
			boardElement.style.left = "20px";
			boardElement.style.width = "40px";
			boardElement.style.height = "50px";
			board.setElement(boardElement);
			dragger.setDroppable(board);

			var context = new Context();
			board.setContext(context);		

			document.body.appendChild(boardElement);

		});

		it("drags a note to a droppable", function(){
			dragger.startDragging(note, new Point(10, 10));
			dragger.dragTo(new Point(40, 40));
			dragger.finishDragging();

			expect(noteElement.style.top).toEqual("20px");
			expect(noteElement.style.left).toEqual("10px");
		});

		it("reverts when not dropped on a droppable", function(){
			dragger.startDragging(note, new Point(10, 10));
			dragger.dragTo(new Point(100, 100));
			dragger.finishDragging();

			expect(noteElement.style.position).toEqual("static");
			expect(noteElement.style.top).toEqual("auto");
			expect(noteElement.style.left).toEqual("auto");
		});

		afterEach(function(){
			document.body.removeChild(boardElement);
		});
	});


	afterEach(function(){
		document.body.onmousemove = null;
		document.body.onmouseup = null;
	});

});


});