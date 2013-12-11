require(['Palette', 'EventBus'], function(Palette, EventBus){


describe('Palette', function(){
	describe('with event handling', function(){
		it('set color with event SELECT_COLOR', function(){
			var eventBus = new EventBus();
			var palette = new Palette();
			palette.enableEventHandling(eventBus);

			triggerSelectColorEvent(eventBus, 'red');
			expect(palette.getColor()).toEqual('red');
		});
	});
});


});