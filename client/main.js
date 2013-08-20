require.config({
	baseUrl: "./scripts",
	paths: {
		Kinetic: '../../lib/kinetic/kinetic-v4.5.3.min'
	},
	urlArgs: "bust=" + (new Date()).getTime()
});

require([
		'core/Board',
		'core/Context',
		'core/Event',
		'core/EventBus',
		'core/Item',
		'core/ItemEventHandler',
		'core/Line',
		'core/Mover',
		'core/Page',
		'core/PageEventHandler',
		'core/Painter',
		'core/Palette',
		'core/Point',
		'core/SerializeStrategy',
		'core/Text',
		'core/TextInput',
		'core/Texter',
		'core/UnserializeStrategy',
		'dom/DOMPalette',
		'dom/KineticContext',
		'dom/KineticCursor',
		'dom/KineticEvent',
		'dom/KineticItemEventRegister',
		'dom/KineticItemFactory',
		'dom/KineticLine',
		'dom/KineticMouseEventOnItemInterpreter',
		'dom/KineticMouseEventOnPageInterpreter',
		'dom/KineticText',
		'dom/KineticTextInput'
	], function(){
		require(['Page', 'Painter', 'Texter', 'Mover', 'DOMPalette', 'KineticContext', 'KineticTextInput', 'EventBus', 'PageEventHandler'], function(Page, Painter, Texter, Mover, DOMPalette, KineticContext, KineticTextInput, EventBus, PageEventHandler){
			var palette = new DOMPalette("palette");
			palette.addColorButton('red');
			palette.addColorButton('blue');
			palette.addColorButton('black');
			var context = new KineticContext("board", 500, 500);

			var painter = new Painter(context, palette);

			var textInput = new KineticTextInput(context);
			var texter = new Texter(palette, textInput);
			var mover = new Mover(context);

			page = new Page(painter, texter, mover);
			eventBus = new EventBus();
			var handler = new PageEventHandler();
			page.enableEventHandling(eventBus, handler);
		});
});