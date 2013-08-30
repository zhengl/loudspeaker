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
      
        
        'dom/DOMBoardFactory' ,
      
        
        'dom/DOMNoteDnDDecorator' ,
      
        
        'dom/DOMNoteFactory' ,
      
        
        'dom/DOMPageFactory' ,
      
        
        'dom/DOMPalette' ,
      
        
        'dom/DOMPaletteFactory' ,
      
        
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
		require(['DOMBoardFactory', 'DOMNoteFactory', 'DOMNoteDnDDecorator', 'uuid', 'jquery', 'jquery-ui'], function(DOMBoardFactory, DOMNoteFactory, DOMNoteDnDDecorator, UUID, $){
			var board = DOMBoardFactory.create("board", "palette", "rubbishbin");
			$("#create-note").click(function(){
				$("#modal").toggleClass("noteIsShown");
				$("#wrapper").toggleClass("noteIsShown");
				$("#modal-cover").toggleClass("noteIsShown");

				var noteUuid = UUID.genV4().toString();
                                DOMNoteDnDDecorator.create(DOMNoteFactory, "modal", board.getPainter().getPalette(), noteUuid);
		    	
			});

		});
});