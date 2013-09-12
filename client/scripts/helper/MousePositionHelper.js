define('MousePositionHelper', function(){


function MousePositionHelper(){
	
}

MousePositionHelper.getOffset = function(event){
	var offsetX = event.offsetX || (event.clientX - event.target.getBoundingClientRect().left);
	var offsetY = event.offsetY || (event.clientY - event.target.getBoundingClientRect().top);
	return {x: offsetX, y: offsetY};
}

return MousePositionHelper;


});
