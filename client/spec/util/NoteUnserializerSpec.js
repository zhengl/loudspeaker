require(['NoteUnserializer','Note'], function(NoteUnserializer, Note){


describe('NoteUnserializer', function(){
	it('unserializes JSON to note', function(){
		var unserializer = new NoteUnserializer();
		var json = {
			uuid: '00000000-0000-0000-0000-000000000003',
			type: 'note',
			position: {x: 20, y: 20},
		};
		var note = unserializer.process(json);
		expect(note instanceof Note).toBe(true);
		expect(note.getUUID()).toEqual('00000000-0000-0000-0000-000000000003');
		expect(note.getPosition()).toEqual({x: 20, y: 20});	
	});
	
});


});