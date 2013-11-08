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

    var noteAndBoardWidthRatio = 1/ 6;

    var boardWidth = 1280;
    var boardHeight = 720;

    var noteWidth = boardWidth * noteAndBoardWidthRatio;
    var noteHeight = noteWidth;    

    var rubbishBinId = 'rubbishbin';
    var rubbishBinWidth = 100;
    var rubbishBinHeight = boardHeight;

    var noteRubbishBinId = 'note-rubbishbin';
    var noteRubbishBinWidth = 20;
    var noteRubbishBinHeight = 100;

    var globalEventBus;
    var boardEventPreprocessor;
    var noteEventPreprocessor;
    var dragger;
    var trigger;

    function fireWindowResize(){
        var evt = document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false,window,0);
        window.dispatchEvent(evt);       
    }

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
                width: boardWidth,
                height: boardHeight,
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
                width: noteWidth,
                height: noteHeight,
                palette: palette,
                rubbishbin: {
                    element: noteRubbishbinElement,
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

            // fireWindowResize();
            
            return {
                board: board,
                note: note,
                globalEventBus: globalEventBus
            };
        },
    };
});