require(['UUID'], function(UUID){
	
	describe('UUID', function(){
		it('should generate different ids', function(){
			var id1 = UUID.generate();
			var id2 = UUID.generate();
			expect(id1).not.toEqual(id2);
		});
	});

});