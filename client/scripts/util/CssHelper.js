define("CssHelper", function(){


function CssHelper(){
	
}

CssHelper.hasClass = function(ele, cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};

CssHelper.addClass = function(ele, cls) {
	if (!CssHelper.hasClass(ele,cls)) {
            ele.className += " "+cls;
    }
};

CssHelper.removeClass = function(ele, cls) {
	if (CssHelper.hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

CssHelper.toggleClass = function(ele, cls) {
	if (CssHelper.hasClass(ele,cls)) {
		CssHelper.removeClass(ele, cls);
	} else {
		CssHelper.addClass(ele, cls);
	}	
}

return CssHelper;


});