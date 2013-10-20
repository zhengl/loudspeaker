require(['LineUnserializer', 'Line'], function(LineUnserializer, Line){
	
	describe('LineUnserializer', function(){
		it('unserialize JSON to line', function(){
			var unserializer = new LineUnserializer();
			var json = {
					uuid: '00000000-0000-0000-0000-000000000001',
					type: 'line',
					color: 'black',
					points: [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
					position: {x: 10, y: 10},
			};

			var line = unserializer.process(json);
			expect(line instanceof Line).toBe(true);
			expect(line.getUUID()).toEqual('00000000-0000-0000-0000-000000000001');
			expect(line.getColor()).toEqual('black');
			expect(line.getPosition()).toEqual({x: 10, y: 10});
			expect(line.getPoints()).toEqual([{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}]);
		});
	});

});