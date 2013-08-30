define('DOMNoteFactory', ['DOMPageFactory', 'jquery', 'jquery-ui'], function(DOMPageFactory, $){


function DOMNoteFactory(){
	
}

DOMNoteFactory.create = function(parentId, palette, uuid) {
		var note = document.createElement('div');
		note.id = "note_" + uuid;
		note.className = "note";
		document.getElementById(parentId).appendChild(note);

		var rubbishBin = document.createElement('div');
		rubbishBin.id = "rubbishbin_" + uuid;
		note.appendChild(rubbishBin);

		var page = DOMPageFactory.create({
			id: note.id,
			palette: palette,
			width: 250,
			height: 250,
			rubbishBinId: rubbishBin.id,
			rubbishBinWidth: 20,
		});

		return page;	
};

return DOMNoteFactory;


});