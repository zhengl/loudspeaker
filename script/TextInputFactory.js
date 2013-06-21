function TextInputFactory(){

}

TextInputFactory.create = function(){
	var textInput;

	switch(Environment.name){
		case Environment.Dummy.name:
			textInput = new TextInput();
		break;
		case Environment.Mouse.name:
			textInput = new CanvasTextInput();
		break;
	}

	return textInput;
};