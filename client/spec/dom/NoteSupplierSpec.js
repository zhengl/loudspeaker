require(['NoteSupplier', 'EventBus', 'NoteFactory'], function(NoteSupplier, EventBus, NoteFactory){


describe("NoteSupplier", function(){
	var noteStack;
	var supplier;
	var eventBus;

	beforeEach(function(){
		var options = {
			width: 50,
			height: 50,
		};

		var noteFactory = new NoteFactory();
		noteFactory.setOptions(options);

		noteStack = document.createElement('div');
		supplier = new NoteSupplier(noteStack, noteFactory);
		document.body.appendChild(noteStack);
		eventBus = new EventBus();
		supplier.enableEventHandling(eventBus);
	});

	it("add note to note stack", function(){
		supplier.addNote();

		expect(noteStack.children[0].className).toEqual("note");
		expect(noteStack.children.length).toEqual(1);
	});

	it('add notes with different id', function(){
		var id1 = supplier.addNote().getElement().id;

		supplier.noteStack.innerHTML = '';

		var id2 = supplier.addNote().getElement().id;
		expect(id1).not.toEqual(id2);
	});

	it("add note when receiving FINISH_DRAGGING", function(){
		triggerFinishDraggingEvent(eventBus, 0, 0);

		expect(noteStack.children[0].className).toEqual("note");
		expect(noteStack.children.length).toEqual(1);
		expect(noteStack.children[0].children.length).toBeGreaterThan(1);
	});

	it("should not add note when there is note on stack", function(){
		var oneMoreNote = document.createElement('div');
		noteStack.appendChild(oneMoreNote);
		triggerFinishDraggingEvent(eventBus, 0, 0);

		expect(noteStack.children.length).toEqual(1);
	});	

	afterEach(function(){
		document.body.removeChild(noteStack);
	});
});


});