require(['Unserializer', 'Context', 'Line', 'Text', 'Point', 'Note', 'Board', 'KineticContext'], function(Unserializer, Context, Line, Text, Point, Note, Board, KineticContext){


describe('Unserializer', function(){
	it('unserializes context', function(){
		var board = new Board();
		var context = new Context();
		board.setContext(context);
		var unserializer = new Unserializer();
		unserializer.process(board, {
			uuid: '00000000-0000-0000-0001-000000000000',
			items: [
				{
					uuid: '00000000-0000-0000-0000-000000000001',
					type: 'line',
					color: 'black',
					points: [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
					position: {x: 10, y: 10},
				},
				{
					uuid: '00000000-0000-0000-0000-000000000002',
					type: 'text',
					color: 'blue',
					content: 'Hello World!',
					position: {x: 20, y: 20},
				},
				{
					uuid: '00000000-0000-0000-0000-000000000003',
					type: 'note',
					position: {x: 20, y: 20},
				},				
				]
		});

		var items = context.getItems();
		expect(context.getUUID()).toEqual('00000000-0000-0000-0001-000000000000');
		expect(items.length).toEqual(3);

		var line = items[0];
		expect(line instanceof Line).toBe(true);
		expect(line.getUUID()).toEqual('00000000-0000-0000-0000-000000000001');
		expect(line.getColor()).toEqual('black');
		expect(line.getPosition()).toEqual({x: 10, y: 10});
		expect(line.getPoints()).toEqual([{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}]);

		var text = items[1];
		expect(text instanceof Text).toBe(true);
		expect(text.getUUID()).toEqual('00000000-0000-0000-0000-000000000002');
		expect(text.getValue()).toEqual('Hello World!');
		expect(text.getColor()).toEqual('blue');
		expect(text.getPosition()).toEqual({x: 20, y: 20});

		var note = items[2];
		expect(note instanceof Note).toBe(true);
		expect(note.getUUID()).toEqual('00000000-0000-0000-0000-000000000003');
		expect(note.getPosition()).toEqual({x: 20, y: 20});		
	});

	xit('unserializes note to DOM element', function(){
		var boardElement = document.createElement('div');
		document.body.appendChild(boardElement);
		boardElement.id = 'board';
		var board = new Board();
		board.setElement(boardElement);
		var context = new KineticContext('board', 100, 100);
		board.setContext(context);
		context.setPage(board);

		var unserializer = new Unserializer();
		unserializer.process(board, {
			uuid: '00000000-0000-0000-0001-000000000000',
			items: [
				{
					uuid: '00000000-0000-0000-0000-000000000001',
					type: 'note',
					position: {x: 20, y: 20},
					items: [
						{
							uuid: '00000000-0000-0000-0000-000000000002',
							type: 'line',
							color: 'black',
							points: [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
							position: {x: 10, y: 10},
						},
						{
							uuid: '00000000-0000-0000-0000-000000000003',
							type: 'text',
							color: 'blue',
							content: 'Hello World!',
							position: {x: 20, y: 20},
						},				
						]					
				},				
				]
		});

		var items = context.getItems();
		var note = items[0];
		var noteElement = note.getElement();
		expect(boardElement.children[0]).toBe(noteElement);
		expect(noteElement.style.left).toEqual('20px');
		expect(noteElement.style.top).toEqual('20px');
		expect(noteElement.className).toEqual('note');

		items = note.getContext().getItems();
		var line = items[0];
		expect(line instanceof Line).toBe(true);
		// expect(line.getUUID()).toEqual('00000000-0000-0000-0000-000000000001');
		// expect(line.getColor()).toEqual('black');
		// expect(line.getPosition()).toEqual({x: 10, y: 10});
		// expect(line.getPoints()).toEqual([{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}]);

		// var text = items[1];
		// expect(text instanceof Text).toBe(true);
		// expect(text.getUUID()).toEqual('00000000-0000-0000-0000-000000000002');
		// expect(text.getValue()).toEqual('Hello World!');
		// expect(text.getColor()).toEqual('blue');
		// expect(text.getPosition()).toEqual({x: 20, y: 20});
	});
});


});