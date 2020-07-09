const assert = require("chai").assert;

const { getBalanceByCategoryInPeriod } = require("../src/index");

describe("getBalanceByCategoryInPeriod()", function () {
  it("returns 0 if there are no transactions", function () {
    assert.equal(
      getBalanceByCategoryInPeriod(
        [],
        "groceries",
        new Date("2018-03-01"),
        new Date("2018-03-31")
      ),
      0
    );
  });

  // add your tests here
});
