require(['Unserializer', 'Context', 'Line', 'Text', 'Point'], function(Unserializer, Context, Line, Text, Point){


describe('Unserializer', function(){
	it('unserializes context', function(){
		var context = new Context();
		var unserializer = new Unserializer();
		unserializer.process(context, {
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
				]
		});

		var items = context.getItems();
		expect(context.getUUID()).toEqual('00000000-0000-0000-0001-000000000000');
		expect(items.length).toEqual(2);

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
	});	
});


});