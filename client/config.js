require.config({
	baseUrl: "scripts",
	paths: {
		
			app: "app",
		
			Context: "core/Context",
		
			Event: "core/Event",
		
			EventBus: "core/EventBus",
		
			EventHandleable: "core/EventHandleable",
		
			Item: "core/Item",
		
			ItemEventHandler: "core/ItemEventHandler",
		
			Line: "core/Line",
		
			Mover: "core/Mover",
		
			MoverEventHandler: "core/MoverEventHandler",
		
			Painter: "core/Painter",
		
			PainterEventHandler: "core/PainterEventHandler",
		
			Palette: "core/Palette",
		
			PaletteEventHandler: "core/PaletteEventHandler",
		
			Point: "core/Point",
		
			RubbishBin: "core/RubbishBin",
		
			RubbishBinEventHandler: "core/RubbishBinEventHandler",
		
			Serializer: "core/Serializer",
		
			Text: "core/Text",
		
			Texter: "core/Texter",
		
			TexterEventHandler: "core/TexterEventHandler",
		
			TextInput: "core/TextInput",
		
			Unserializer: "core/Unserializer",
		
			DOMNoteDnDDecorator: "dom/DOMNoteDnDDecorator",
		
			DOMPageFactory: "dom/DOMPageFactory",
		
			DOMPalette: "dom/DOMPalette",
		
			DOMPaletteFactory: "dom/DOMPaletteFactory",
		
			DOMRubbishBin: "dom/DOMRubbishBin",
		
			GestureDetector: "dom/GestureDetector",
		
			GestureStep: "dom/GestureStep",
		
			KineticContext: "dom/KineticContext",
		
			KineticCursor: "dom/KineticCursor",
		
			KineticEvent: "dom/KineticEvent",
		
			KineticItemEventRegister: "dom/KineticItemEventRegister",
		
			KineticItemFactory: "dom/KineticItemFactory",
		
			KineticLine: "dom/KineticLine",
		
			KineticMouseEventOnItemInterpreter: "dom/KineticMouseEventOnItemInterpreter",
		
			KineticPainter: "dom/KineticPainter",
		
			KineticText: "dom/KineticText",
		
			KineticTexter: "dom/KineticTexter",
		
			KineticTextInput: "dom/KineticTextInput",
		
			MouseEventOnContextInterpreter: "dom/MouseEventOnContextInterpreter",
		
			MovingGestureDetector: "dom/MovingGestureDetector",
		
			Page: "dom/Page",
		
			PaintingGestureDetector: "dom/PaintingGestureDetector",
		
			PaletteGestureDetector: "dom/PaletteGestureDetector",
		
			TextingGestureDetector: "dom/TextingGestureDetector",
		
			Debugger: "helper/Debugger",
		
			MousePositionHelper: "helper/MousePositionHelper",
		
		"jquery": '../../lib/jquery/jquery-1.9.1',
		"jquery-ui": '../../lib/jquery/jquery-ui',
		"domReady": '../../lib/domReady/domReady',
		"Kinetic": '../../lib/kinetic/kinetic-v4.6.0',
		"uuid": '../../lib/uuid/uuid'
	},
	urlArgs: "bust=" + (new Date()).getTime(),
	shim: {
			'uuid': {
				exports: 'UUID',
			}
	}
});