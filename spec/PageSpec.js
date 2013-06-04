describe("Page", function() {
  var page;

  beforeEach(function() {
    page = new Page(new FakeContext());
  });

  it("should return an Item after drawing a line", function() {
    var item = page.drawLine();
	expect(page.context.getItems().length).toEqual(1);
    expect(item instanceof Item).toBe(true);
  });

});