require.config({
	baseUrl: "scripts",
	paths: {
		
			app: "app",
		
			Context: "core/Context",
		
			Event: "core/event/Event",
		
			EventBus: "core/event/EventBus",
		
			EventHandleable: "core/event/EventHandleable",
		
			MoverEventHandler: "core/event/MoverEventHandler",
		
			PainterEventHandler: "core/event/PainterEventHandler",
		
			PaletteEventHandler: "core/event/PaletteEventHandler",
		
			RubbishBinEventHandler: "core/event/RubbishBinEventHandler",
		
			TexterEventHandler: "core/event/TexterEventHandler",
		
			Item: "core/Item",
		
			Line: "core/Line",
		
			Mover: "core/Mover",
		
			Painter: "core/Painter",
		
			Palette: "core/Palette",
		
			Point: "core/Point",
		
			RubbishBin: "core/RubbishBin",
		
			Text: "core/Text",
		
			Texter: "core/Texter",
		
			TextInput: "core/TextInput",
		
			DOMPalette: "dom/DOMPalette",
		
			DOMRubbishBin: "dom/DOMRubbishBin",
		
			GestureDetector: "dom/event/GestureDetector",
		
			GestureStep: "dom/event/GestureStep",
		
			KineticEvent: "dom/event/KineticEvent",
		
			MouseEventInterpreter: "dom/event/MouseEventInterpreter",
		
			MouseEventPreprocessor: "dom/event/MouseEventPreprocessor",
		
			MovingGestureDetector: "dom/event/MovingGestureDetector",
		
			PaintingGestureDetector: "dom/event/PaintingGestureDetector",
		
			PaletteGestureDetector: "dom/event/PaletteGestureDetector",
		
			SelectingGestureDetector: "dom/event/SelectingGestureDetector",
		
			TextingGestureDetector: "dom/event/TextingGestureDetector",
		
			KineticContext: "dom/KineticContext",
		
			KineticCursor: "dom/KineticCursor",
		
			KineticLine: "dom/KineticLine",
		
			KineticPainter: "dom/KineticPainter",
		
			KineticText: "dom/KineticText",
		
			KineticTexter: "dom/KineticTexter",
		
			KineticTextInput: "dom/KineticTextInput",
		
			Page: "dom/Page",
		
			Debugger: "util/Debugger",
		
			DOMNoteDnDDecorator: "util/DOMNoteDnDDecorator",
		
			DOMPageFactory: "util/DOMPageFactory",
		
			DOMPaletteFactory: "util/DOMPaletteFactory",
		
			MousePositionHelper: "util/MousePositionHelper",
		
			Serializer: "util/Serializer",
		
			Unserializer: "util/Unserializer",
		
		"jquery": '../../lib/jquery/jquery-1.9.1',
		"jquery-ui": '../../lib/jquery/jquery-ui',
		"domReady": '../../lib/domReady/domReady',
		"Kinetic": '../../lib/kinetic/kinetic-v4.6.0',
		"uuid": '../../lib/uuid/uuid',
		"bootstrap": '../../lib/bootstrap/bootstrap.min'
	},
	urlArgs: "bust=" + (new Date()).getTime(),
	shim: {
			'uuid': {
				exports: 'UUID',
			},
			'bootstrap': {
				exports: 'bootstrap',
			}
	}
});