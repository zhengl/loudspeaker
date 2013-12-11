require(['TextSampler', 'Texter', 'Palette', 'TextInput', 'Context', 'EventBus'], function(TextSampler, Texter, Palette, TextInput, Context, EventBus){


describe('TextSampler', function(){
	it('refreshes text sample when receiving SELECT_COLOR', function(){
		var texter = new Texter(new Palette(), new TextInput(new Context()));
		var sampler = new TextSampler(texter);
		var eventBus = new EventBus();
		sampler.enableEventHandling(eventBus);

		triggerSelectColorEvent(eventBus, 'red');
		expect(texter).toHaveOneItem();
		
		var text = sampler.getTexter().getContext().getItems()[0];
		expect(text.getColor()).toEqual('red');
		expect(text.getValue()).toEqual('T');
	});
});


});