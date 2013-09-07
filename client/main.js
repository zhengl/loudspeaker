require(['config'], function(){

require(['domReady', 'DOMPageFactory', 'DOMNoteDnDDecorator', 'uuid', 'jquery', 'jquery-ui'], function(domReady, DOMPageFactory, DOMNoteDnDDecorator, UUID, $){
       domReady(function(){
        var board = DOMPageFactory.create("board", 700, 700, "palette", "rubbishbin", 100, 700);
        $("#create-note").click(function(){
                $("#modal").toggleClass("noteIsShown");
                $("#wrapper").toggleClass("noteIsShown");
                $("#modal-cover").toggleClass("noteIsShown");

                var note = DOMPageFactory.create("note", 250, 250, "note-palette", "note-rubbishbin", 50, 250);
                DOMNoteDnDDecorator.create("note", note, "board", board);
        
        });
       });
});

});
