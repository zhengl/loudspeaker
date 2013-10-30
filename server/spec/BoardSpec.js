var webdriver = require('selenium-webdriver');
var fs = require('fs');
jasmine.getEnv().defaultTimeoutInterval = 30000;

describe('Board', function(){
	var driver;

	beforeEach(function(){
		buildDriver();
		openSession();
	});

	it("draws a line", function(){
		drawALine();
		expectALineOnTheCanvas();
	});

	it("writes a text", function(){
		writeAText();
		expectATextOnTheCanvas();
	});

	it("moves a line", function(){
		drawALine();
		moveTheLine();
		expectAMovedLineOnTheCanvas();
	});

	afterEach(function(done){
		closeSession(done);
	});	
});

function buildDriver(){
	driver = new webdriver.Builder()
		.usingServer('http://localhost:4445/wd/hub')
		.withCapabilities(
			webdriver.Capabilities.chrome()
				.set('username', process.env.SAUCE_USERNAME)
				.set('accessKey', process.env.SAUCE_ACCESS_KEY)
				.set('tunnel-identifier', process.env.TRAVIS_JOB_NUMBER)
				.set('build', process.env.TRAVIS_BUILD_NUMBER)
			)
		.build();
}

function openSession(){
	driver.manage().window().setSize(800, 600);
	driver.get('http://localhost:8080');
	driver.wait(function(){
		return driver.findElement(webdriver.By.tagName('body')).isDisplayed();
	}, 5000);
}

function closeSession(done){
	driver.quit().then(function(){
		done();
	});
}

function drawALine(){
	var board = driver.findElement(webdriver.By.id('board'));

	driver.actions()
		.mouseMove(board, { x: 1, y: 1 })
		.mouseDown()
		.mouseMove({ x: 0, y: 0 })
		.mouseMove({ x: 0, y: 0 })
		.mouseMove({ x: 100, y: 100 })
		.mouseUp()
		.perform();
}

function moveTheLine(){
	var board = driver.findElement(webdriver.By.id('board'));

	driver.actions()
		.mouseMove(board, { x: 50, y: 50 })
		.mouseDown()
		.perform();
	
	driver.sleep(550);

	driver.actions()
		.mouseMove(board, { x: 100, y: 50 })
		.mouseUp()
		.perform();
}

function writeAText(){
	var board = driver.findElement(webdriver.By.id('board'));

	new webdriver.ActionSequence(driver)
		.mouseMove(board, { x: 10, y: 10 })
		.mouseDown()
		.mouseUp()
		.mouseDown()
		.mouseUp()
		.sendKeys('Hello World!')
		.sendKeys(webdriver.Key.ENTER)
		.perform();
}

function expectCanvastoEqualDataURLInFile(expected){
	driver.executeScript('return document.querySelectorAll("#board canvas")[1].toDataURL()').then(function(dataUrl){
		fs.readFile(__dirname + '/fixture/' + expected , "utf-8", function(err, expectedDataUrl){
			// fs.writeFile('url.txt', dataUrl)
			expect(dataUrl).toEqual(expectedDataUrl);
		})
	});
}

function expectALineOnTheCanvas(){
	expectCanvastoEqualDataURLInFile('line.data');
}

function expectATextOnTheCanvas(){
	expectCanvastoEqualDataURLInFile('text.data');
}

function expectAMovedLineOnTheCanvas(){
	expectCanvastoEqualDataURLInFile('movedLine.data');
}
