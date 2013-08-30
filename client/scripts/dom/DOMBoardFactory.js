define('DOMBoardFactory', ['DOMPageFactory', 'DOMPaletteFactory'], function(DOMPageFactory, DOMPaletteFactory){


function DOMBoardFactory(){
	
}

DOMBoardFactory.create = function(boardId, paletteId, rubbishBinId) {
		var palette = DOMPaletteFactory.create(paletteId);
		var page = DOMPageFactory.create({
			id: boardId,
			palette: palette,
			width: 700,
			height: 700,
			rubbishBinId: rubbishBinId,
			rubbishBinWidth: 100,
		});

		return page;
};

return DOMBoardFactory;


});