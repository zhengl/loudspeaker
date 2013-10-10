require.config({
	baseUrl: "scripts",
	paths: {
		
			app: "app",
		
			Context: "core/Context",
		
			Event: "core/event/Event",
		
			EventBridge: "core/event/EventBridge",
		
			EventBus: "core/event/EventBus",
		
			EventFilter: "core/event/EventFilter",
		
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
		
			Board: "dom/Board",
		
			DOMPalette: "dom/DOMPalette",
		
			DOMRubbishBin: "dom/DOMRubbishBin",
		
			GestureDetector: "dom/event/GestureDetector",
		
			GestureStep: "dom/event/GestureStep",
		
			KineticEvent: "dom/event/KineticEvent",
		
			MouseEventInterpreter: "dom/event/MouseEventInterpreter",
		
			MouseEventPreprocessor: "dom/event/MouseEventPreprocessor",
		
			MovingGestureDetector: "dom/event/MovingGestureDetector",
		
			NoteDraggerEventHandler: "dom/event/NoteDraggerEventHandler",
		
			NoteDraggingGestureDetector: "dom/event/NoteDraggingGestureDetector",
		
			NoteSupplierEventHandler: "dom/event/NoteSupplierEventHandler",
		
			PaintingGestureDetector: "dom/event/PaintingGestureDetector",
		
			PanelTriggerEventHandler: "dom/event/PanelTriggerEventHandler",
		
			SelectingGestureDetector: "dom/event/SelectingGestureDetector",
		
			TextingGestureDetector: "dom/event/TextingGestureDetector",
		
			KineticContext: "dom/KineticContext",
		
			KineticCursor: "dom/KineticCursor",
		
			KineticLine: "dom/KineticLine",
		
			KineticPainter: "dom/KineticPainter",
		
			KineticText: "dom/KineticText",
		
			KineticTexter: "dom/KineticTexter",
		
			KineticTextInput: "dom/KineticTextInput",
		
			Note: "dom/Note",
		
			NoteDragger: "dom/NoteDragger",
		
			NoteSupplier: "dom/NoteSupplier",
		
			Page: "dom/Page",
		
			PanelTrigger: "dom/PanelTrigger",
		
			CssHelper: "util/CssHelper",
		
			Debugger: "util/Debugger",
		
			DOMBoardFactory: "util/DOMBoardFactory",
		
			DOMNoteFactory: "util/DOMNoteFactory",
		
			MousePositionHelper: "util/MousePositionHelper",
		
			Serializer: "util/Serializer",
		
			Unserializer: "util/Unserializer",
		
		"Kinetic": '../../lib/kinetic/kinetic-v4.6.0',
		"uuid": '../../lib/uuid/uuid',
	},
	urlArgs: "bust=" + (new Date()).getTime(),
	shim: {
			'uuid': {
				exports: 'UUID',
			},
	}
});