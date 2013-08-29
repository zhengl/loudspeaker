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
		require(['DOMBoardFactory', 'jquery', 'jquery-ui'], function(DOMBoardFactory, $){
			DOMBoardFactory.create("board", "palette", "rubbish_bin");

			$("#create_note").click(function(){
		      $("#modal").toggleClass("noteIsShown");
		      $("#wrapper").toggleClass("noteIsShown");
		      $("#modal_cover").toggleClass("noteIsShown");
			});

			$( "#draggable_zone" ).draggable({ revert: true });
			$( "#droppable_zone" ).droppable({
				drop: function( event, ui ) {
						console.log("dropped!")
					}
				});
			});
});