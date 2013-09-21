define('app', ['DOMPageFactory', 'MouseEventPreprocessor', 'DOMNoteDnDDecorator', 'config', 'uuid', 'jquery', 'jquery-ui'], function(DOMPageFactory, MouseEventPreprocessor, DOMNoteDnDDecorator, config, UUID, $){
    var ratio = 16 / 9;
    var boardId = 'board';
    var paletteId = 'palette';
    var boardElement = $('#' + boardId);

    var boardActualWidth = 854;
    var boardActualHeight = 480;

    var boardStyleWidth;
    var boardStyleHeight;

    var rubbishBinId = 'rubbishbin'
    var rubbishBinWidth = 100;

    var eventPreprocessor;
    var interpreter;

    function adjustBoardHeight() {
        boardStyleWidth = boardElement.width();
        boardStyleHeight = boardStyleWidth / ratio;
        boardElement.height(boardStyleHeight);

        $('.kineticjs-content').width(boardStyleWidth).height(boardStyleHeight);
        $('canvas').width(boardStyleWidth).height(boardStyleHeight);
    }

    function onRepaint(){
        adjustBoardHeight();
        eventPreprocessor.setZoomPercentage(boardActualWidth / boardStyleWidth);
    }

    return {
        start: function(){
            eventPreprocessor = new MouseEventPreprocessor();


            var rubbishBinHeight = boardActualHeight;

            var rubbishbinElement = $('<div id="' + rubbishBinId + '" class="rubbishbin"></div>');
            rubbishbinElement.appendTo($('body'));

            var paletteElement = $('<div id="' + paletteId + '" class="palette"></div>');
            paletteElement.appendTo($('body'));

            var board = DOMPageFactory.create(
                boardId, 
                boardActualWidth, 
                boardActualHeight,
                paletteId,
                rubbishBinId, 
                rubbishBinWidth,
                rubbishBinHeight,
                eventPreprocessor
            );

            rubbishbinElement.insertAfter(boardElement);

            // onRepaint();

            $( window ).resize(function() {
              onRepaint();
            });
            // $("#create-note").click(function(){
            //         $("#modal").toggleClass("noteIsShown");
            //         $("#wrapper").toggleClass("noteIsShown");
            //         $("#modal-cover").toggleClass("noteIsShown");

            //         var note = DOMPageFactory.create("note", 250, 250, "note-palette", "note-rubbishbin", 50, 250);
            //         DOMNoteDnDDecorator.create("note", note, "board", board);
            
            // });
            
            return board;   
        },
    }; 
});