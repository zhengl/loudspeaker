require(['Serializer', 'Context', 'Line', 'Point', 'Text', 'Note'], function(Serializer, Context, Line, Point, Text, Note){


describe('Serializer', function(){
	var context;

	beforeEach(function(){
		context = new Context();
	});

	it('serializes context', function(){
		var contextUUID = 'contextUUID';
		context.setUUID(contextUUID);

		var line = new Line([new Point(0, 0), new Point(10, 10)]);
		var lineUUID = 'lineUUID';
		line.setUUID(lineUUID);
		line.setColor('black');
		line.setPosition(new Point(30, 30));
		context.addItem(line);

		var text = new Text('Hello World!');
		text.setPosition(new Point(0, 0));
		var textUUID = 'textUUID';
		text.setUUID(textUUID);
		text.setColor('blue');
		text.setPosition(new Point(0, 0));
		context.addItem(text);

		var note = new Note();
		var noteUUID = 'noteUUID';
		note.setUUID(noteUUID);
		note.setPosition(new Point(10, 10));
		context.addItem(note);

		var serializer = new Serializer();
		expect(serializer.process(context)).toEqual({
			uuid: contextUUID,
			items: [
				{
					uuid: lineUUID,
					type: 'line',
					color: 'black',
					points: [{x: 0, y: 0}, {x: 10, y: 10}],
					position: {x: 30, y: 30},
				},
				{
					uuid: textUUID,
					type: 'text',
					color: 'blue',
					content: 'Hello World!',
					position: {x: 0, y: 0},
				},
				{
					uuid: noteUUID,
					type: 'note',
					position: {x: 10, y: 10},
				},		
				]
		});
	});
});


});