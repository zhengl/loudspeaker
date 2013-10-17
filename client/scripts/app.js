define('app', ['DOMBoardFactory', 'DOMNoteFactory', 'MouseEventPreprocessor', 'DOMPalette', 'Note', 'NoteDragger', 'NoteSupplier', 'PanelTrigger', 'EventBus', 'config', 'uuid'], function(DOMBoardFactory, DOMNoteFactory, MouseEventPreprocessor, DOMPalette, Note, NoteDragger, NoteSupplier, PanelTrigger, EventBus, config, UUID){
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

    function adjustBoardHeight() {
        boardStyleWidth = boardElement.offsetWidth;
        boardStyleHeight = boardStyleWidth / ratio;
        boardElement.style.height = boardStyleHeight + 'px';

        board.getContext().setScale(boardStyleWidth / boardActualWidth);
    }

    function adjustNote(zoom){
        adjustNoteHeight();
        adjustNotePosition(zoom);
    }

    function adjustNoteHeight(){
        noteStyleWidth = boardElement.offsetWidth / boardAndNoteSizeRatio;
        noteElement.style.width = noteStyleWidth + 'px';
        noteElement.style.height = noteStyleWidth + 'px';

        note.getContext().setScale(noteStyleWidth / noteActualWidth);
    }

    function adjustNotePosition(zoom){
        var items = board.getContext().getItems();

        for(var i = 0; i < items.length; i++) {
            if(items[i] instanceof Note){
                items[i].setZoomPercentage(zoom);
                items[i].moveTo(items[i].getPosition());
            }
        }
    }

    function adjustBoardRubbishBinHeight(){
        rubbishbinElement.style.height = boardStyleHeight + 'px';
    }

    function adjustNoteRubbishBinHeight(){
        noteRubbishbinElement.style.height = noteStyleWidth + 'px';
    }

    function onRepaint(){
        var zoom = boardActualWidth / boardStyleWidth;
        boardEventPreprocessor.setZoomPercentage(zoom);
        noteEventPreprocessor.setZoomPercentage(zoom);
        dragger.setZoomPercentage(zoom);
        adjustBoardHeight();
        adjustBoardRubbishBinHeight();
        adjustNote(zoom);
        adjustNoteRubbishBinHeight();
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

            board = DOMBoardFactory.create(
                boardElement,
                boardActualWidth,
                boardActualHeight,
                palette,
                rubbishBinId,
                rubbishBinWidth,
                rubbishBinHeight,
                boardEventPreprocessor,
                globalEventBus
            );

            note = DOMNoteFactory.create(
                noteElement,
                noteActualWidth,
                noteActualHeight,
                palette,
                noteRubbishBinId,
                noteRubbishBinWidth,
                noteRubbishBinHeight,
                noteEventPreprocessor,
                globalEventBus
            );

            boardElement.appendChild(rubbishbinElement);
            noteElement.appendChild(noteRubbishbinElement);

            dragger = new NoteDragger();
            dragger.enableEventHandling(globalEventBus);
            dragger.setDroppable(board);

            var panel = document.querySelector('.panel');
            trigger = new PanelTrigger(panel);
            trigger.enableEventHandling(globalEventBus);

            var noteStack = document.getElementById('note-stack');
            var supplier = new NoteSupplier(noteStack);
            supplier.enableEventHandling(globalEventBus);

            onRepaint();

            window.onresize = function(){
              onRepaint();
            };

            document.querySelector('.panel-handle .arrow').onclick = function(){
                trigger.togglePanel();
            };
            
            return board;
        },
    };
});