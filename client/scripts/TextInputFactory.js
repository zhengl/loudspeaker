define('TextInputFactory', ['Environment', 'TextInput', 'KineticTextInput'], function(Environment, TextInput, KineticTextInput){


function TextInputFactory(){

}

TextInputFactory.create = function(context){
	var textInput;
	switch(Environment.name){
		case Environment.Dummy.name:
			textInput = new TextInput(context);
		break;
		case Environment.Mouse.name:
			textInput = new KineticTextInput(context);
			textInput.enableEventHandling();
		break;
	}

	return textInput;
};

return TextInputFactory;

	
});