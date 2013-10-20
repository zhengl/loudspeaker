require.config({
	baseUrl: "scripts",
	paths: {
		
			app: "app",
		
			Context: "core/Context",
		
			Event: "core/event/Event",
		
			EventBridge: "core/event/EventBridge",
		
			EventBus: "core/event/EventBus",
		
			EventFilter: "core/event/EventFilter",
		
			EventHandleable: "core/event/handler/EventHandleable",
		
			MoverEventHandler: "core/event/handler/MoverEventHandler",
		
			PainterEventHandler: "core/event/handler/PainterEventHandler",
		
			RubbishBinEventHandler: "core/event/handler/RubbishBinEventHandler",
		
			TexterEventHandler: "core/event/handler/TexterEventHandler",
		
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
		
			GestureDetector: "dom/event/gesture/GestureDetector",
		
			GestureStep: "dom/event/gesture/GestureStep",
		
			MovingGestureDetector: "dom/event/gesture/MovingGestureDetector",
		
			NoteDraggingGestureDetector: "dom/event/gesture/NoteDraggingGestureDetector",
		
			PaintingGestureDetector: "dom/event/gesture/PaintingGestureDetector",
		
			TextingGestureDetector: "dom/event/gesture/TextingGestureDetector",
		
			NoteDraggerEventHandler: "dom/event/handler/NoteDraggerEventHandler",
		
			NoteSupplierEventHandler: "dom/event/handler/NoteSupplierEventHandler",
		
			PanelTriggerEventHandler: "dom/event/handler/PanelTriggerEventHandler",
		
			MouseEvent: "dom/event/MouseEvent",
		
			MouseEventInterpreter: "dom/event/MouseEventInterpreter",
		
			MouseEventPreprocessor: "dom/event/MouseEventPreprocessor",
		
			MovingEventFilter: "dom/event/MovingEventFilter",
		
			NoteEventTransformer: "dom/event/NoteEventTransformer",
		
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
		
			LineUnserializer: "util/LineUnserializer",
		
			MousePositionHelper: "util/MousePositionHelper",
		
			NoteUnserializer: "util/NoteUnserializer",
		
			Serializer: "util/Serializer",
		
			TextUnserializer: "util/TextUnserializer",
		
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