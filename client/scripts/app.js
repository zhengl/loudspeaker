define('app', ['DOMPageFactory', 'DOMNoteDnDDecorator', 'config', 'uuid', 'jquery', 'jquery-ui'], function(DOMPageFactory, DOMNoteDnDDecorator, config, UUID, $){
    var ratio = 16 / 9;
    var boardId = 'board';
    var paletteId = 'palette';
    var boardElement = $('#' + boardId);

    var boardActualWidth = 1280;
    var boardActualHeight = 720;

    var rubbishBinId = 'rubbishbin'
    var rubbishBinWidth = 100;

    function adjustBoardHeight() {
        var boardStyleWidth = boardElement.width();
        var boardStyleHeight = boardStyleWidth / ratio;
        boardElement.height(boardStyleHeight);

        $('.kineticjs-content').width(boardStyleWidth).height(boardStyleHeight);
        $('canvas').width(boardStyleWidth).height(boardStyleHeight);
    }

    return {
        start: function(){
            adjustBoardHeight();
            $( window ).resize(function() {
              adjustBoardHeight();
            });

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
                rubbishBinHeight
            );

            rubbishbinElement.insertAfter(boardElement);


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