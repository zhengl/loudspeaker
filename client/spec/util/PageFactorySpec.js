require(['Page', 'PageFactory', 'KineticContext', 'KineticPainter', 'KineticTexter', 'Mover', 'DOMRubbishBin'], function(Page, PageFactory, KineticContext, KineticPainter, KineticTexter, Mover, DOMRubbishBin){


describe('PageFactory', function(){
	var page;
	var pageElement;
	var factory;

	beforeEach(function(){
		pageElement = document.createElement('div');
		pageElement.id = 'page';
		document.body.appendChild(pageElement);		
		
		factory = new PageFactory();

		var options = {
			element: pageElement,
			height: 50,
			width: 50,
			ratio: 16 / 9
		};

		factory.setOptions(options);
		page = factory.create();
	});

	it('creates a basic page', function(){
		expect(page.getElement()).toBe(pageElement);
		expect(page.getContext() instanceof KineticContext).toBeTruthy();
		expect(page.getPainter() instanceof KineticPainter).toBeTruthy();
		expect(page.getTexter() instanceof KineticTexter).toBeTruthy();
		expect(page.getMover() instanceof Mover).toBeTruthy();
	});

	it('adjusts height when window resizes', function(){
		var evt = document.createEvent('UIEvents');
		evt.initUIEvent('resize', true, false,window,0);
		fireEvent(window, null, evt);

		var width = page.getElement().offsetWidth;
		var height = parseInt(page.getElement().style.height, 10);
		expect( width / height ).toBeCloseTo( 16 / 9, 2 );
	});

	it('adjusts scale of context when window resizes', function(){
		var evt = document.createEvent('UIEvents');
		evt.initUIEvent('resize', true, false,window,0);
		fireEvent(window, null, evt);

		var width = page.getElement().offsetWidth;
		expect(page.getContext().getScale().x).toEqual(width/50);
		expect(page.getContext().getScale().y).toEqual(width/50);
	});	

	it('creates a page with rubbish bin', function(){
		rubbishBinElement = document.createElement('div');

		var options = {
			element: pageElement,
			height: 50,
			width: 50,
			rubbishbin: {
				element: rubbishBinElement,
				width: 10,
				height: 50,
			}
		};

		factory.setOptions(options);
		var page = factory.create();

		expect(page.getMover().getRubbishBin() instanceof DOMRubbishBin).toBeTruthy();
		expect(pageElement.lastChild).toBe(rubbishBinElement);
	});

	afterEach(function(){
		document.body.removeChild(pageElement);
	});
});


});