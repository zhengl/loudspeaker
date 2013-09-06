require.config({
	baseUrl: "./scripts",
	paths: {
		"jquery": '../../lib/jquery/jquery-1.9.1',
		"jquery-ui": '../../lib/jquery/jquery-ui',
		"Kinetic": '../../lib/kinetic/kinetic-v4.5.3.min',
		"uuid": '../../lib/uuid/uuid'
	},
	urlArgs: "bust=" + (new Date()).getTime(),
	shim: {
			'uuid': {
				exports: 'UUID',
			}
	}
});

require([
 'core/Context' ,
      
        
        'core/Event' ,
      
        
        'core/EventBus' ,
      
        
        'core/EventHandleable' ,
      
        
        'core/Item' ,
      
        
        'core/ItemEventHandler' ,
      
        
        'core/Line' ,
      
        
        'core/Mover' ,
      
        
        'core/MoverEventHandler' ,
      
        
        'core/Page' ,
      
        
        'core/Painter' ,
      
        
        'core/PainterEventHandler' ,
      
        
        'core/Palette' ,
      
        
        'core/PaletteEventHandler' ,
      
        
        'core/Point' ,
      
        
        'core/RubbishBin' ,
      
        
        'core/RubbishBinEventHandler' ,
      
        
        'core/Serializer' ,
      
        
        'core/Text' ,
      
        
        'core/TextInput' ,
      
        
        'core/Texter' ,
      
        
        'core/TexterEventHandler' ,
      
        
        'core/Unserializer' ,
      
        
        'dom/DOMNoteDnDDecorator' ,
      
        
        'dom/DOMPageFactory' ,
      
        
        'dom/DOMPalette' ,
      
        
        'dom/DOMPaletteFactory' ,
      
        
        'dom/DOMRubbishBin' ,
      
        
        'dom/KineticContext' ,
      
        
        'dom/KineticCursor' ,
      
        
        'dom/KineticDraftLayer' ,
      
        
        'dom/KineticEvent' ,
      
        
        'dom/KineticItemEventRegister' ,
      
        
        'dom/KineticItemFactory' ,
      
        
        'dom/KineticLayer' ,
      
        
        'dom/KineticLine' ,
      
        
        'dom/KineticMouseEventOnContextInterpreter' ,
      
        
        'dom/KineticMouseEventOnItemInterpreter' ,
      
        
        'dom/KineticPainter' ,
      
        
        'dom/KineticText' ,
      
        
        'dom/KineticTextInput' ,
      
        
        'dom/KineticTexter' 
	], function(){
		require(['DOMPageFactory', 'DOMNoteDnDDecorator', 'uuid', 'jquery', 'jquery-ui'], function(DOMPageFactory, DOMNoteDnDDecorator, UUID, $){
			var board = DOMPageFactory.create("board", 700, 700, "palette", "rubbishbin", 100, 700);
			$("#create-note").click(function(){
				$("#modal").toggleClass("noteIsShown");
				$("#wrapper").toggleClass("noteIsShown");
				$("#modal-cover").toggleClass("noteIsShown");

				// var noteUuid = UUID.genV4().toString();
                var note = DOMPageFactory.create("note", 250, 250, "note-palette", "note-rubbishbin", 50, 250);
                DOMNoteDnDDecorator.create("note", note, board);
		    	
			});

		});
});