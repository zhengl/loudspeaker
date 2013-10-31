require(['app', 'Debugger'], function(app, Debugger){
    componants = app.start();
    var boardDebugger = new Debugger();
    var board = componants.board;
    boardDebugger.adhereTo(board);

    var noteDebugger = new Debugger();
    var note = componants.note;
    noteDebugger.adhereTo(note);
});