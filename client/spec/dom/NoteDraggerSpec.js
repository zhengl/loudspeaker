require(['NoteDragger', 'Note', 'Point', 'Board', 'Context'], function(NoteDragger, Note, Point, Board, Context){


describe('NoteDragger', function(){
	var dragger;
	var note;
	var noteElement;

	beforeEach(function(){
		dragger = new NoteDragger();
		note = new Note();

		var panel = document.createElement('div');
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

	it("bind body to onmousemove and onmouseup", function(){
		expect(document.body.onmousemove).toBeNull();
		expect(document.body.onmouseup).toBeNull();

		dragger.startDragging(note, new Point(10, 10));

		expect(document.body.onmousemove).not.toBeNull();
		expect(document.body.onmouseup).not.toBeNull();
	});

	it("unbind body from onmousemove and onmouseup", function(){
		dragger.startDragging(note, new Point(10, 10));
		dragger.dragTo(new Point(20, 20));
		dragger.finishDragging();

		expect(document.body.onmousemove).toBeNull();
		expect(document.body.onmouseup).toBeNull();		
	});	

	it("drags a note to absolute position", function(){
		dragger.startDragging(note, new Point(10, 10));
		dragger.dragTo(new Point(30, 30));
		expect(noteElement.style.top).toEqual("20px");
		expect(noteElement.style.left).toEqual("20px");
	});


	describe("with droppable", function(){
		beforeEach(function(){
			var board = new Board();
			var boardElement = document.createElement("div");
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
	});


	afterEach(function(){
		document.body.onmousemove = null;
		document.body.onmouseup = null;
	});

});


});