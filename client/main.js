require.config({
	baseUrl: "./scripts",
	paths: {
		Kinetic: '../../lib/kinetic/kinetic-v4.5.3.min',
		uuid: '../../lib/uuid/uuid'
	},
	urlArgs: "bust=" + (new Date()).getTime(),
	shim: {
			'uuid': {
				exports: 'UUID',
			}
	}
});

require([
'core/Board' ,
      
        
        'core/Context' ,
      
        
        'core/Event' ,
      
        
        'core/EventBus' ,
      
        
        'core/Item' ,
      
        
        'core/ItemEventHandler' ,
      
        
        'core/Line' ,
      
        
        'core/Mover' ,
      
        
        'core/Page' ,
      
        
        'core/PageEventHandler' ,
      
        
        'core/Painter' ,
      
        
        'core/Palette' ,
      
        
        'core/Point' ,
      
        
        'core/RubbishBin' ,
      
        
        'core/SerializeStrategy' ,
      
        
        'core/Text' ,
      
        
        'core/TextInput' ,
      
        
        'core/Texter' ,
      
        
        'core/UnserializeStrategy' ,
      
        
        'dom/DOMPalette' ,
      
        
        'dom/DOMRubbishBin' ,
      
        
        'dom/KineticContext' ,
      
        
        'dom/KineticCursor' ,
      
        
        'dom/KineticEvent' ,
      
        
        'dom/KineticItemEventRegister' ,
      
        
        'dom/KineticItemFactory' ,
      
        
        'dom/KineticLine' ,
      
        
        'dom/KineticMouseEventOnItemInterpreter' ,
      
        
        'dom/KineticMouseEventOnPageInterpreter' ,
      
        
        'dom/KineticText' ,
      
        
        'dom/KineticTextInput' 
	], function(){
		require(['Page', 'Painter', 'Texter', 'Mover', 'DOMPalette', 'KineticContext', 'KineticTextInput', 'EventBus', 'PageEventHandler', 'DOMRubbishBin','Point'], function(Page, Painter, Texter, Mover, DOMPalette, KineticContext, KineticTextInput, EventBus, PageEventHandler, DOMRubbishBin, Point){
			var palette = new DOMPalette("palette");
			palette.addColorButton('red');
			palette.addColorButton('blue');
			palette.addColorButton('black');
			var context = new KineticContext("board", 700, 700);

			var painter = new Painter(context, palette);

			var textInput = new KineticTextInput(context);
			var texter = new Texter(palette, textInput);
			var mover = new Mover(context);
			var bin = new DOMRubbishBin(new Point(600, 0), new Point(700, 700), "rubbish_bin");
			mover.setRubbishBin(bin);

			page = new Page(painter, texter, mover);
			eventBus = new EventBus();
			bin.registerEventBus(eventBus);
			var handler = new PageEventHandler();
			page.enableEventHandling(eventBus, handler);
		});
});