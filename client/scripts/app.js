define('app', ['BoardFactory', 'NoteFactory', 'MouseEventPreprocessor', 'DOMPalette', 'Note', 'NoteDragger', 'NoteSupplier', 'PanelTrigger', 'EventBus', 'UUID'], function(BoardFactory, NoteFactory, MouseEventPreprocessor, DOMPalette, Note, NoteDragger, NoteSupplier, PanelTrigger, EventBus, UUID){
    var board;
    var note;

    var ratio = 16 / 9;
    var boardId = 'board';
    var boardElement = document.getElementById(boardId);
    var rubbishbinElement;
    var noteRubbishbinElement;

    var noteAndBoardWidthRatio = 1 / 6;
    var rubbishBinAndPageWidthRatio = 1 / 10;

    var boardWidth = 1280;
    var boardHeight = 720;

    var noteWidth = boardWidth * noteAndBoardWidthRatio;
    var noteHeight = noteWidth;    

    var rubbishBinId = 'rubbishbin';
    var rubbishBinWidth = boardWidth * rubbishBinAndPageWidthRatio;
    var rubbishBinHeight = boardHeight;

    var noteRubbishBinId = 'note-rubbishbin';
    var noteRubbishBinWidth = noteHeight * rubbishBinAndPageWidthRatio;
    var noteRubbishBinHeight = noteHeight;

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
                width: noteWidth,
                height: noteHeight,
                palette: palette,
                rubbishbin: {
                    width: noteRubbishBinWidth,
                    height: noteRubbishBinHeight,
                },
                eventPreprocessor: noteEventPreprocessor,
                globalEventBus: globalEventBus
            };
            noteFactory.setOptions(noteOptions);

            dragger = new NoteDragger();
            dragger.enableEventHandling(globalEventBus);
            dragger.setDroppable(board);

            var panel = document.querySelector('.panel');
            trigger = new PanelTrigger(panel);
            trigger.enableEventHandling(globalEventBus);

            document.querySelector('.panel-handle').onclick = function(){
                trigger.togglePanel();
            };

            var noteStack = document.getElementById('note-stack');
            var supplier = new NoteSupplier(noteStack, noteFactory);
            supplier.enableEventHandling(globalEventBus);

            var note = supplier.addNote();

            document.body.style.visibility = 'visible';

            return {
                board: board,
                note: note,
                globalEventBus: globalEventBus
            };
        },
    };
});