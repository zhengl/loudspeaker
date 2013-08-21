var data;

exports.populate = function(allData){
	data = allData;
};

exports.findAllBoards = function(){
	return data;
};

exports.addBoard = function(newBoard){
	data.push(newBoard);
};
