require(['TextUnserializer', 'Text'], function(TextUnserializer, Text){
	
	describe('TextUnserializer', function(){
		it('unserialize JSON to text', function(){
			var unserializer = new TextUnserializer();
			var json = {
					uuid: '00000000-0000-0000-0000-000000000002',
					type: 'text',
					color: 'blue',
					content: 'Hello World!',
					position: {x: 20, y: 20},
			};

			var text = unserializer.process(json);
			expect(text instanceof Text).toBe(true);
			expect(text.getUUID()).toEqual('00000000-0000-0000-0000-000000000002');
			expect(text.getValue()).toEqual('Hello World!');
			expect(text.getColor()).toEqual('blue');
			expect(text.getPosition()).toEqual({x: 20, y: 20});
		});
	});

});