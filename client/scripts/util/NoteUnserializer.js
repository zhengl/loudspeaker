define('NoteUnserializer', ['Note', 'NoteFactory', 'KineticContext'], function(Note, NoteFactory, KineticContext){
	
function NoteSerializer(){

}

NoteSerializer.prototype.process = function(json, context) {
	var note = new Note();
	note.setUUID(json.uuid);

	var noteElement = document.createElement('div');
	noteElement.id = 'note-' + note.getUUID();
	noteElement.className = 'note';

    noteRubbishbinElement = document.createElement('div');
    noteRubbishbinElement.id = 'note-rubbishbin' + note.getUUID();
    noteRubbishbinElement.className = 'rubbishbin';	

    if (context instanceof KineticContext){
		note = NoteFactory.create(
			noteElement,
			1280 / 6,
			1280 / 6,
			context.getPage().getPalette(),
			noteRubbishbinElement.id,
			100,
			20,
			context.getPage().getEventPreprocessor()
		);
	}

	note.moveTo(json.position);

	return note;
};

return NoteSerializer;

});