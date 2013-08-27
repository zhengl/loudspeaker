require(['Mover', 'RubbishBin', 'Context', 'Line', 'Point'], function(Mover, RubbishBin, Context, Line, Point){

describe("Mover", function(){
	var mover;
	var line;
	var context;

	beforeEach(function(){
		context = new Context();
		mover = new Mover(context);
		line = new Line([new Point(0, 0), new Point(10, 10)])
		context.draw(line);
	});

	it("should move a line", function(){
		mover.startMoving(line);
		mover.moveTo(new Point(20, 20));
		mover.finishMoving();
		expect(line.getPosition()).toEqual({x: 20, y:20});
	});

	it("should be able to set removal zone", function(){
		expect(context.getItems().length).toEqual(1);

		var rubbishBin = new RubbishBin();
		mover.setRubbishBin(rubbishBin);
		rubbishBin.open();

		mover.startMoving(line);
		mover.moveTo(new Point(45, 10));
		mover.finishMoving();
		expect(context.getItems().length).toEqual(0);
	});
});

});
