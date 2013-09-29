require(['NoteDragger', 'Note', 'Point'], function(NoteDragger, Note, Point){


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

	it("appends to body after enabling drag and drop", function(){
		dragger.startDragging(note, new Point(10, 10));
		var noteElement = note.getElement();
		expect(noteElement.parentNode).toEqual(document.body);
		expect(noteElement.style.position).toEqual("absolute");
		expect(noteElement.style.top).toEqual("100px");
		expect(noteElement.style.left).toEqual("200px");
	});

	it("appends to body after enabling drag and drop", function(){
		dragger.startDragging(note, new Point(10, 10));
		dragger.dragTo(new Point(30, 30));
		expect(noteElement.style.top).toEqual("20px");
		expect(noteElement.style.left).toEqual("20px");
	});

});


});