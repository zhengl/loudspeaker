define('EventFilter', function(){

function EventFilter(){

}

EventFilter.prototype.accept = function(func) {
	this.accept = func;
};

return EventFilter;

});