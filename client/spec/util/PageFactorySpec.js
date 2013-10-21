require(['Page', 'PageFactory', 'KineticContext', 'KineticPainter', 'KineticTexter', 'Mover', 'DOMRubbishBin'], function(Page, PageFactory, KineticContext, KineticPainter, KineticTexter, Mover, DOMRubbishBin){


describe('PageFactory', function(){
	var pageElement;
	var factory;

	beforeEach(function(){
		pageElement = document.createElement('div');
		pageElement.id = 'page';
		document.body.appendChild(pageElement);		
		
		factory = new PageFactory();
	});

	it('creates a basic page', function(){
		var options = {
			height: 50,
			width: 50,
		};

		var page = factory.create(pageElement, options);

		expect(page.getElement()).toBe(pageElement);
		expect(page.getContext() instanceof KineticContext).toBeTruthy();
		expect(page.getPainter() instanceof KineticPainter).toBeTruthy();
		expect(page.getTexter() instanceof KineticTexter).toBeTruthy();
		expect(page.getMover() instanceof Mover).toBeTruthy();
	});

	it('creates a page with rubbish bin', function(){
		rubbishBinElement = document.createElement('div');

		var options = {
			height: 50,
			width: 50,
			rubbishbin: {
				element: rubbishBinElement,
				width: 10,
				height: 50,
			}
		};

		var page = factory.create(pageElement, options);

		expect(page.getMover().getRubbishBin() instanceof DOMRubbishBin).toBeTruthy();
		expect(pageElement.lastChild).toBe(rubbishBinElement);
	});

	afterEach(function(){
		document.body.removeChild(pageElement);
	});
});


});