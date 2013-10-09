require(['NoteSupplier', 'EventBus'], function(NoteSupplier, EventBus){


describe("NoteSupplier", function(){
	var noteStack;
	var supplier;
	var eventBus;

	beforeEach(function(){
		noteStack = document.createElement('div');
		supplier = new NoteSupplier(noteStack);
		document.body.appendChild(noteStack);
		eventBus = new EventBus();
		supplier.enableEventHandling(eventBus);
	});

	it("add note to note stack", function(){
		supplier.addNote();

		expect(noteStack.children[0].className).toEqual("note");
		expect(noteStack.children.length).toEqual(1);
	});

	it("add note when receiving FINISH_DRAGGING", function(){
		triggerFinishDraggingEvent(eventBus, 0, 0);

		expect(noteStack.children[0].className).toEqual("note");
		expect(noteStack.children.length).toEqual(1);
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