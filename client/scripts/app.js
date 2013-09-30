define('app', ['DOMBoardFactory', 'DOMNoteFactory', 'MouseEventPreprocessor', 'DOMNoteDnDDecorator', 'config', 'uuid', 'jquery', 'jquery-ui', 'bootstrap'], function(DOMBoardFactory, DOMNoteFactory, MouseEventPreprocessor, DOMNoteDnDDecorator, config, UUID, $){
    var board;
    var note;

    var ratio = 16 / 9;
    var boardId = 'board';
    var noteId = 'note';
    var boardElement = $('#' + boardId);
    var noteElement = $('#' + noteId);
    var rubbishbinElement;
    var noteRubbishbinElement;

    var noteActualWidth = 320;
    var noteActualHeight = 320;

    var boardActualWidth = 1280;
    var boardActualHeight = 720;

    var boardStyleWidth;
    var boardStyleHeight;

    var rubbishBinId = 'rubbishbin'
    var rubbishBinWidth = 100;
    var rubbishBinHeight = boardActualHeight;

    var noteRubbishBinId = 'note-rubbishbin'
    var noteRubbishBinWidth = 20;
    var noteRubbishBinHeight = noteActualHeight;

    var eventPreprocessor;
    var interpreter;

    function adjustBoardHeight() {
        boardStyleWidth = boardElement.width();
        boardStyleHeight = boardStyleWidth / ratio;
        boardElement.height(boardStyleHeight);

        board.getContext().setScale(boardStyleWidth / boardActualWidth);
    }

    function adjustNoteHeight(){
        noteStyleWidth = boardElement.width() / 4;
        noteElement.width(noteStyleWidth);
        noteElement.height(noteStyleWidth);

        note.getContext().setScale(noteStyleWidth / noteActualWidth);
    }

    function adjustBoardRubbishBinHeight(){
        rubbishbinElement.height(boardStyleHeight);
    }

    function adjustNoteRubbishBinHeight(){
        noteRubbishbinElement.height(noteStyleWidth);
    }

    function onRepaint(){
        adjustBoardHeight();
        adjustBoardRubbishBinHeight();
        adjustNoteHeight();
        adjustNoteRubbishBinHeight();
        boardEventPreprocessor.setZoomPercentage(boardActualWidth / boardStyleWidth);
        noteEventPreprocessor.setZoomPercentage(noteActualWidth / noteStyleWidth);
    }

    return {
        start: function(){
            boardEventPreprocessor = new MouseEventPreprocessor();
            noteEventPreprocessor = new MouseEventPreprocessor();

            rubbishbinElement = $('<div id="' + rubbishBinId + '" class="rubbishbin"></div>');
            rubbishbinElement.appendTo($('body'));

            noteRubbishbinElement = $('<div id="' + noteRubbishBinId + '" class="rubbishbin"></div>');
            noteRubbishbinElement.appendTo($('body'));

            var paletteElement = $('.palette');

            board = DOMBoardFactory.create(
                boardElement[0], 
                boardActualWidth, 
                boardActualHeight,
                paletteElement,
                rubbishBinId, 
                rubbishBinWidth,
                rubbishBinHeight,
                boardEventPreprocessor
            );

            note = DOMNoteFactory.create(
                noteElement[0], 
                noteActualWidth, 
                noteActualHeight,
                paletteElement,
                noteRubbishBinId, 
                noteRubbishBinWidth,
                noteRubbishBinHeight,
                noteEventPreprocessor,
                board
            );            

            rubbishbinElement.appendTo(boardElement);
            noteRubbishbinElement.appendTo(noteElement);

            onRepaint();

            $( window ).resize(function() {
              onRepaint();
            });
            
            $('.panel-handle .arrow').click(function(){
                $('.panel').toggleClass('expand');
                $('.panel-trigger').toggleClass('expand');
                adjustNoteHeight();
            });
            
            return board;
        },
    }; 
});