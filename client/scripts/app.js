define('app', ['DOMPageFactory', 'MouseEventPreprocessor', 'DOMNoteDnDDecorator', 'config', 'uuid', 'jquery', 'jquery-ui'], function(DOMPageFactory, MouseEventPreprocessor, DOMNoteDnDDecorator, config, UUID, $){
    var board;

    var ratio = 16 / 9;
    var boardId = 'board';
    var paletteId = 'palette';
    var boardElement = $('#' + boardId);
    var rubbishbinElement;

    var boardActualWidth = 1280;
    var boardActualHeight = 720;

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

        board.getContext().setScale(boardStyleWidth / boardActualWidth);
    }

    function onRepaint(){
        adjustBoardHeight();
        rubbishbinElement.height(boardStyleHeight);
        eventPreprocessor.setZoomPercentage(boardActualWidth / boardStyleWidth);
    }

    return {
        start: function(){
            eventPreprocessor = new MouseEventPreprocessor();

            var rubbishBinHeight = boardActualHeight;

            rubbishbinElement = $('<div id="' + rubbishBinId + '" class="rubbishbin"></div>');
            rubbishbinElement.appendTo($('body'));

            var paletteElement = $('<div id="' + paletteId + '" class="palette"></div>');
            paletteElement.appendTo($('body'));

            board = DOMPageFactory.create(
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

            onRepaint();

            $( window ).resize(function() {
              onRepaint();
            });
            
            $('.paneltrigger').click(function(){

            });
            
            return board;   
        },
    }; 
});