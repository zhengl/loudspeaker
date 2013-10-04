define('app', ['DOMBoardFactory', 'DOMNoteFactory', 'MouseEventPreprocessor', 'config', 'uuid'], function(DOMBoardFactory, DOMNoteFactory, MouseEventPreprocessor, config, UUID){
    var board;
    var note;

    var ratio = 16 / 9;
    var boardId = 'board';
    var noteId = 'note';
    var boardElement = document.getElementById(boardId);
    var noteElement = document.getElementById(noteId);
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
        boardStyleWidth = boardElement.offsetWidth;
        boardStyleHeight = boardStyleWidth / ratio;
        boardElement.style.height = boardStyleHeight + "px";

        board.getContext().setScale(boardStyleWidth / boardActualWidth);
    }

    function adjustNoteHeight(){
        noteStyleWidth = boardElement.offsetWidth / 4;
        noteElement.style.width = noteStyleWidth + "px";
        noteElement.style.height = noteStyleWidth + "px";

        note.getContext().setScale(noteStyleWidth / noteActualWidth);
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
        adjustNoteHeight();
        adjustNoteRubbishBinHeight();
        boardEventPreprocessor.setZoomPercentage(boardActualWidth / boardStyleWidth);
        noteEventPreprocessor.setZoomPercentage(noteActualWidth / noteStyleWidth);
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

            board = DOMBoardFactory.create(
                boardElement, 
                boardActualWidth, 
                boardActualHeight,
                paletteElement,
                rubbishBinId, 
                rubbishBinWidth,
                rubbishBinHeight,
                boardEventPreprocessor
            );

            note = DOMNoteFactory.create(
                noteElement, 
                noteActualWidth, 
                noteActualHeight,
                paletteElement,
                noteRubbishBinId, 
                noteRubbishBinWidth,
                noteRubbishBinHeight,
                noteEventPreprocessor,
                board
            );            

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