var png = require('../../lib/png/PNG');

function toEqualDataUrlWithTolerance(expected, tolerance){
	var expectedBData = getData(expected);
	var expectedImage = new png.PNG(expectedBData);

	var actualData = getData(this.actual);
	var actualImage = new png.PNG(actualData);

	var total = 0;
	var count = 0;
	var actualImageLine;
	var expectedImageLine;
	while((actualImageLine = actualImage.readLine()) && (expectedImageLine = expectedImage.readLine())){
		for (var i = 0; i < actualImageLine.length; i++) {
			total++;
			if (actualImageLine[i] != expectedImageLine[i]) {
				count++;
			}
		}
	}
	return tolerance > count/total;
}

function getData(dataUrl){
	return dataUrl.slice(22); //remove data:image/png;base64,
}

exports.toEqualDataUrlWithTolerance = toEqualDataUrlWithTolerance;
