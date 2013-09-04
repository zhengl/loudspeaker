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
      
        
        'core/Item' ,
      
        
        'core/ItemEventHandler' ,
      
        
        'core/Line' ,
      
        
        'core/Mover' ,
      
        
        'core/MoverEventHandler' ,
      
        
        'core/Painter' ,
      
        
        'core/PainterEventHandler' ,
      
        
        'core/Palette' ,
      
        
        'core/PaletteEventHandler' ,
      
        
        'core/Point' ,
      
        
        'core/RubbishBin' ,
      
        
        'core/Serializer' ,
      
        
        'core/Text' ,
      
        
        'core/TextInput' ,
      
        
        'core/Texter' ,
      
        
        'core/TexterEventHandler' ,
      
        
        'core/Unserializer' ,
      
        
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
      
        
        'dom/KineticMouseEventOnContextInterpreter' ,
      
        
        'dom/KineticMouseEventOnItemInterpreter' ,
      
        
        'dom/KineticPainter' ,
      
        
        'dom/KineticText' ,
      
        
        'dom/KineticTextInput' ,
      
        
        'dom/KineticTexter' 
	], function(){
		require(['DOMBoardFactory', 'jquery', 'jquery-ui'], function(DOMBoardFactory, $){
			var board = DOMBoardFactory.create("board", "palette", "rubbishbin");
			// $("#create-note").click(function(){
			// 	$("#modal").toggleClass("noteIsShown");
			// 	$("#wrapper").toggleClass("noteIsShown");
			// 	$("#modal-cover").toggleClass("noteIsShown");

			// 	var noteUuid = UUID.genV4().toString();
   //                              DOMNoteDnDDecorator.create(DOMNoteFactory, "modal", board.getPainter().getPalette(), noteUuid);
		    	
			// });

		});
});