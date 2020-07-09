const assert = require("chai").assert;

const { getBalanceByCategoryInPeriod } = require("../src/index");

const transactions = [
  {
    id: 123,
    sourceAccount: "my_account",
    targetAccount: "coffee_shop",
    amount: -30,
    category: "eating_out",
    time: "2018-03-12T12:34:00Z",
  },
  {
    id: 123,
    sourceAccount: "my_account",
    targetAccount: "coffee_shop",
    amount: -20,
    category: "eating_out",
    time: "2018-03-11T12:34:00Z",
  },
  {
    id: 123,
    sourceAccount: "my_account",
    targetAccount: "coffee_shop",
    amount: 10,
    category: "groceries",
    time: "2018-03-10T12:34:00Z",
  },
];

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

  it("returns sum of transactions in time period", function () {
    assert.equal(
      getBalanceByCategoryInPeriod(
        transactions,
        "groceries",
        new Date("2018-03-01"),
        new Date("2018-03-31")
      ),
      10
    );
  });

  // add your tests here
});
