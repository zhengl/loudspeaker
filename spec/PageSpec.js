describe("Page", function() {
  var page;

  beforeEach(function() {
    page = new Page();
  });

  it("should return an Item after drawing a line", function() {
    var item = page.drawLine(new Point(0, 0), new Point(10, 10));
    expect(item instanceof Item).toBe(true);
  });

});