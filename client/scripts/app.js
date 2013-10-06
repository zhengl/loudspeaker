define('app', ['DOMBoardFactory', 'DOMNoteFactory', 'MouseEventPreprocessor', 'DOMPalette', 'NoteDragger', 'config', 'uuid'], function(DOMBoardFactory, DOMNoteFactory, MouseEventPreprocessor, DOMPalette, NoteDragger, config, UUID){
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

    var rubbishBinId = 'rubbishbin'
    var rubbishBinWidth = 100;
    var rubbishBinHeight = boardActualHeight;

    var noteRubbishBinId = 'note-rubbishbin'
    var noteRubbishBinWidth = 20;
    var noteRubbishBinHeight = noteActualHeight;

    var eventPreprocessor;
    var interpreter;
    var dragger;

    function adjustBoardHeight() {
        boardStyleWidth = boardElement.offsetWidth;
        boardStyleHeight = boardStyleWidth / ratio;
        boardElement.style.height = boardStyleHeight + "px";

        board.getContext().setScale(boardStyleWidth / boardActualWidth);
    }

    function adjustNote(){
        adjustNoteHeight();
        adjustNotePosition();
    }

    function adjustNoteHeight(){
        noteStyleWidth = boardElement.offsetWidth / boardAndNoteSizeRatio;
        noteElement.style.width = noteStyleWidth + "px";
        noteElement.style.height = noteStyleWidth + "px";

        note.getContext().setScale(noteStyleWidth / noteActualWidth);
    }

    function adjustNotePosition(){
        var items = board.getContext().getItems();
        for(var i = 0; i < items; i++) {
            if(items instanceof Note){
                dragger.dragTo(items[i].getPosition());
            }
        }
    }    

    function adjustBoardRubbishBinHeight(){
        rubbishbinElement.style.height = boardStyleHeight + "px";
    }

    function adjustNoteRubbishBinHeight(){
        noteRubbishbinElement.style.height = noteStyleWidth + "px";
    }

    function onRepaint(){
        adjustBoardHeight();
        adjustBoardRubbishBinHeight();
        adjustNote();
        adjustNoteRubbishBinHeight();
        var zoom = boardActualWidth / boardStyleWidth;
        boardEventPreprocessor.setZoomPercentage(zoom);
        noteEventPreprocessor.setZoomPercentage(zoom);
        dragger.setZoomPercentage(zoom);
    }

    function hasClass(ele, cls) {
        return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    }

    function addClass(ele, cls) {
        if (!hasClass(ele,cls)) {
            ele.className += " "+cls;
        }
    }

    function removeClass(ele, cls) {
        if (hasClass(ele,cls)) {
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            ele.className=ele.className.replace(reg,' ');
        }
    }

    function toggleClass(ele, cls) {
        if (hasClass(ele,cls)) {
            removeClass(ele, cls);
        } else {
            addClass(ele, cls);
        }
    }

    return {
        start: function(){
            boardEventPreprocessor = new MouseEventPreprocessor();
            noteEventPreprocessor = new MouseEventPreprocessor();

            rubbishbinElement = document.createElement("div");
            rubbishbinElement.id = rubbishBinId;
            rubbishbinElement.className = "rubbishbin";
            document.body.appendChild(rubbishbinElement);

            noteRubbishbinElement = document.createElement("div");
            noteRubbishbinElement.id = noteRubbishBinId;
            noteRubbishbinElement.className = "rubbishbin";
            document.body.appendChild(noteRubbishbinElement);            

            var paletteElement = document.querySelector(".palette");
            var palette = new DOMPalette(paletteElement);

            board = DOMBoardFactory.create(
                boardElement, 
                boardActualWidth, 
                boardActualHeight,
                palette,
                rubbishBinId, 
                rubbishBinWidth,
                rubbishBinHeight,
                boardEventPreprocessor
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
                board
            );

            dragger = new NoteDragger();
            dragger.enableEventHandling(note.getEventBus());
            dragger.setDroppable(board);

            boardElement.appendChild(rubbishbinElement);
            noteElement.appendChild(noteRubbishbinElement);

            onRepaint();

            window.onresize = function(){
              onRepaint();
            };
            
            document.querySelector('.panel-handle .arrow').onclick = function(){
                toggleClass(document.querySelector('.panel'), 'expand');
            }

            
            return board;
        },
    }; 
});