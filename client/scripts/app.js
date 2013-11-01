define('app', ['BoardFactory', 'NoteFactory', 'MouseEventPreprocessor', 'DOMPalette', 'Note', 'NoteDragger', 'NoteSupplier', 'PanelTrigger', 'EventBus', 'uuid'], function(BoardFactory, NoteFactory, MouseEventPreprocessor, DOMPalette, Note, NoteDragger, NoteSupplier, PanelTrigger, EventBus, UUID){
    var board;
    var note;

    var ratio = 16 / 9;
    var boardId = 'board';
    var noteId = 'note';
    var boardElement = document.getElementById(boardId);
    var noteElement = document.getElementById(noteId);
    var rubbishbinElement;
    var noteRubbishbinElement;

    var boardAndNoteSizeRatio = 6;

    var boardActualWidth = 1280;
    var boardActualHeight = 720;

    var noteActualWidth = boardActualWidth / boardAndNoteSizeRatio;
    var noteActualHeight = noteActualWidth;

    var boardStyleWidth;
    var boardStyleHeight;

    var noteStyleWidth;

    var rubbishBinId = 'rubbishbin';
    var rubbishBinWidth = 100;
    var rubbishBinHeight = boardActualHeight;

    var noteRubbishBinId = 'note-rubbishbin';
    var noteRubbishBinWidth = 20;
    var noteRubbishBinHeight = noteActualHeight;

    var globalEventBus;
    var boardEventPreprocessor;
    var noteEventPreprocessor;
    var dragger;
    var trigger;

    return {
        start: function(){
            boardEventPreprocessor = new MouseEventPreprocessor();
            noteEventPreprocessor = new MouseEventPreprocessor();

            rubbishbinElement = document.createElement('div');
            rubbishbinElement.id = rubbishBinId;
            rubbishbinElement.className = 'rubbishbin';
            document.body.appendChild(rubbishbinElement);

            noteRubbishbinElement = document.createElement('div');
            noteRubbishbinElement.id = noteRubbishBinId;
            noteRubbishbinElement.className = 'rubbishbin';
            document.body.appendChild(noteRubbishbinElement);

            var paletteElement = document.querySelector('.palette');
            var palette = new DOMPalette(paletteElement, 'palette-color');
            
            globalEventBus = new EventBus();

            var boardFactory = new BoardFactory();
            var boardOptions = 
            {
                element: boardElement,
                width: boardActualWidth,
                height: boardActualHeight,
                ratio: ratio,
                palette: palette,
                rubbishbin: {
                    element: rubbishbinElement,
                    width: rubbishBinWidth,
                    height: rubbishBinHeight,
                },
                eventPreprocessor: boardEventPreprocessor,
                globalEventBus: globalEventBus
            };
            boardFactory.setOptions(boardOptions);
            board = boardFactory.create();

            var noteFactory = new NoteFactory();
            var noteOptions = 
            {
                element: noteElement,
                width: noteActualWidth,
                height: noteActualHeight,
                ratio: 1,
                palette: palette,
                rubbishbin: {
                    element: rubbishbinElement,
                    width: noteRubbishBinWidth,
                    height: noteRubbishBinHeight,
                },
                eventPreprocessor: noteEventPreprocessor,
                globalEventBus: globalEventBus
            };
            noteFactory.setOptions(noteOptions);
            note = noteFactory.create();

            boardElement.appendChild(rubbishbinElement);
            noteElement.appendChild(noteRubbishbinElement);

            dragger = new NoteDragger();
            dragger.enableEventHandling(globalEventBus);
            dragger.setDroppable(board);

            var panel = document.querySelector('.panel');
            trigger = new PanelTrigger(panel);
            trigger.enableEventHandling(globalEventBus);

            document.querySelector('.panel-handle .arrow').onclick = function(){
                trigger.togglePanel();
            };

            var noteStack = document.getElementById('note-stack');
            var supplier = new NoteSupplier(noteStack, noteFactory);
            supplier.enableEventHandling(globalEventBus);

            document.body.style.visibility = 'visible';
            
            return {
                board: board,
                note: note
            };
        },
    };
});